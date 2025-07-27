using InvoiceMe.Server.Data.Models;

namespace InvoiceMe.Server.Services.InvoiceServices
{
    public class InvoiceService : IInvoiceService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _contextAccessor;

        public InvoiceService(DataContext context, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        public async Task<PaginatedTableResponse<InvoiceDTO>> GetInvoicesPaginated(GetPaginatedDTO request)
        {
            var response = new PaginatedTableResponse<InvoiceDTO>();
            try
            {
                IQueryable<Invoice> query = _context.Invoices
                .AsNoTracking()
                .Include(invoice => invoice.Client)
                    .ThenInclude(client => client.User)
                .OrderByDescending(invoice => invoice.InvoiceDate);

                query = FilterInvoiceByRole(query);

                IQueryable<Invoice>? statusFilterQuery = FilterInvoiceByStatus(request.InvoiceStatus, query);
                if (statusFilterQuery != null) query = statusFilterQuery;

                IQueryable<Invoice>? clientIdFilterQuery = FilterInvoiceByClientId(request.CustomerId, query);
                if (clientIdFilterQuery != null) query = clientIdFilterQuery;

                IQueryable<Invoice>? dateRangeFilterQuery = FilterInvoiceByDateRange(request.DateStart, request.DateEnd, query);
                if (dateRangeFilterQuery != null) query = dateRangeFilterQuery;

                IQueryable<Invoice>? searchQuery = SearchInvoice(request.SearchValue, query);
                if (searchQuery != null) query = searchQuery;

                response.Count = await query.CountAsync();
                if (response.Count == 0) return response;

                List<Invoice> dbInvoices = await query
                    .Skip(request.Skip)
                    .Take(request.Take)
                    .ToListAsync();

                response.ResponseData = dbInvoices
                    .Select(invoice => ModelMapper.ToInvoiceDTO(invoice))
                    .ToList();

                return response;
            }
            catch
            {
                return response;
            }
        }

        private IQueryable<Invoice> FilterInvoiceByRole(IQueryable<Invoice> query)
        {
            Guid.TryParse(UserUtils.GetUserId(_contextAccessor), out Guid userId);
            Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);

            if (role == UserRoles.CLIENT) query = query.Where(invoice => invoice.Client.UserId == userId);
            return query;
        }

        private IQueryable<Invoice>? FilterInvoiceByClientId(int clientId, IQueryable<Invoice> query)
        {
            if (clientId == 0) return null;
            return query.Where(invoice => invoice.ClientId == clientId);
        }

        private IQueryable<Invoice>? FilterInvoiceByStatus(InvoiceStatus? status, IQueryable<Invoice> query)
        {
            if (status == null) return null;
            return query.Where(invoice => invoice.Status == status);
        }

        private IQueryable<Invoice>? FilterInvoiceByDateRange(DateTime? startDate, DateTime? endDate, IQueryable<Invoice> query)
        {
            if(startDate == null || endDate == null) return null;
            return query.Where(invoice => invoice.InvoiceDate.Date >= startDate && invoice.InvoiceDate.Date <= endDate);
        }

        private IQueryable<Invoice>? SearchInvoice(string? searchValue, IQueryable<Invoice> query)
        {
            if(string.IsNullOrEmpty(searchValue)) return null;
            return query.Where(invoice => 
                invoice.InvoiceNo.Contains(searchValue) ||
                (invoice.Client.User.FirstName + " " + invoice.Client.User.LastName).Contains(searchValue) ||
                invoice.Id.ToString().Contains(searchValue));
        }

        public async Task<PaginatedCountsResponse?> GetInvoiceCountsByStatus()
        {
            try
            {
                var counts = await _context.Invoices
                    .GroupBy(invoice => invoice.Status)
                    .Select(group => new {
                        Status = group.Key,
                        Count = group.Count()
                    })
                    .ToListAsync();
                
                var response = new PaginatedCountsResponse
                {
                    AllCount = counts.Sum(invoice => invoice.Count),
                    ToBePaidCount = counts
                        .Where(invoice => invoice.Status == InvoiceStatus.TO_BE_PAID)
                        .Sum(invoice => invoice.Count),
                    CancelledCount = counts
                        .Where(invoice => invoice.Status == InvoiceStatus.CANCELLED)
                        .Sum(invoice => invoice.Count),
                    OverdueCount = counts
                        .Where(invoice => invoice.Status == InvoiceStatus.OVERDUE)
                        .Sum(invoice => invoice.Count),
                    PaidCount = counts
                        .Where(invoice => invoice.Status == InvoiceStatus.PAID)
                        .Sum(invoice => invoice.Count)
                };
                return response;
            }
            catch
            {
                return null;
            }
        }

        public async Task<InvoiceDetailsDTO?> GetInvoiceDetailsById(int invoiceId)
        {
            try
            {
                Invoice? dbInvoice = await _context.Invoices
                    .Where(invoice => invoice.Id == invoiceId)
                    .Include(invoice => invoice.InvoiceItems)
                    .Include(invoice => invoice.Client)
                        .ThenInclude(client => client.User)
                    .FirstOrDefaultAsync();

                if (dbInvoice == null) return null;

                InvoiceDetailsDTO response = ModelMapper.ToInvoiceDetailsDTO(dbInvoice);
                return response;
            }
            catch
            {
                return null;
            }
        }

        public async Task<GeneralResponse<object>> CreateInvoice(CreateInvoiceDTO request)
        {
            try
            {
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponse("Unauthorized access.", HttpStatusCode.Unauthorized);

                var newInvoice = new Invoice
                {
                    InvoiceNo = $"INV-{TimeUtils.PHTime():yyyyMMdd}-{Guid.NewGuid().ToString("N").Substring(0, 4).ToUpper()}",
                    InvoiceDate = TimeUtils.PHTime(),
                    DueDate = request.DueDate,
                    Status = InvoiceStatus.TO_BE_PAID,
                    Subtotal = request.SubTotal,
                    Tax = request.Tax,
                    TotalAmount = request.Total,
                    ClientId = request.ClientId,

                };
                _context.Invoices.Add(newInvoice);

                foreach(InvoiceItemDTO item in request.Items)
                {
                    var invoiceItem = new InvoiceItem
                    {
                        Title = item.Title,
                        Qty = item.Qty,
                        UnitPrice = item.UnitPrice,
                        Invoice = newInvoice,
                        InvoiceId = newInvoice.Id
                    };
                    _context.InvoiceItems.Add(invoiceItem);
                }


                int result = await _context.SaveChangesAsync();
                return result > 0
                    ? ResponseHelper.SuccessResponse()
                    : ResponseHelper.ErrorResponse("Failed to save invoice to the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<GeneralResponse<object>> UpdateInvoiceStatus(UpdateInvoiceStatusDTO request)
        {
            try
            {
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.UnauthorizedResponse("Unauthorized access.");

                Invoice? dbInvoice = await _context.Invoices
                    .FirstOrDefaultAsync(invoice => invoice.Id == request.InvoiceId);

                if (dbInvoice == null) return ResponseHelper.ErrorResponse("Invoice not found.", HttpStatusCode.NotFound);

                dbInvoice.Status = request.Status;

                int result = await _context.SaveChangesAsync();
                return result > 0
                    ? ResponseHelper.SuccessResponse()
                    : ResponseHelper.ErrorResponse("Failed to update invoice status in the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}
