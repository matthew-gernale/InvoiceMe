
using InvoiceMe.Server.Data.Models;

namespace InvoiceMe.Server.Services.PaymentServices
{
    public class PaymentService : IPaymentService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _contextAccessor;

        public PaymentService(DataContext context, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        public async Task<PaginatedTableResponse<PaymentDTO>> GetPaymentsPaginated(GetPaginatedDTO request)
        {
            var response = new PaginatedTableResponse<PaymentDTO>();
            try
            {
                IQueryable<Payment> query = _context.Payments
                .AsNoTracking()
                .Include(payment => payment.Invoice)
                    .ThenInclude(invoice => invoice.Client)
                        .ThenInclude(client => client.User)
                .OrderByDescending(payment => payment.DateCreated);

                query = FilterPaymentByRole(query);

                IQueryable<Payment>? statusFilterQuery = FilterPaymentByStatus(request.ApprovalStatus, query);
                if (statusFilterQuery != null) query = statusFilterQuery;

                IQueryable<Payment>? clientIdFilterQuery = FilterPaymentByClientId(request.CustomerId, query);
                if (clientIdFilterQuery != null) query = clientIdFilterQuery;

                IQueryable<Payment>? dateRangeFilterQuery = FilterPaymentByDateRange(request.DateStart, request.DateEnd, query);
                if (dateRangeFilterQuery != null) query = dateRangeFilterQuery;

                IQueryable<Payment>? searchQuery = SearchPayment(request.SearchValue, query);
                if (searchQuery != null) query = searchQuery;

                response.Count = await query.CountAsync();
                if (response.Count == 0) return response;

                List<Payment> dbInvoices = await query
                    .Skip(request.Skip)
                    .Take(request.Take)
                    .ToListAsync();

                response.ResponseData = dbInvoices
                    .Select(payment => ModelMapper.ToPaymentDTO(payment))
                    .ToList();

                return response;
            }
            catch
            {
                return response;
            }
        }

        private IQueryable<Payment> FilterPaymentByRole(IQueryable<Payment> query)
        {
            Guid.TryParse(UserUtils.GetUserId(_contextAccessor), out Guid userId);
            Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);

            if (role == UserRoles.CLIENT) query = query.Where(payment => payment.Invoice.Client.UserId == userId);
            return query;
        }

        private IQueryable<Payment>? FilterPaymentByClientId(int clientId, IQueryable<Payment> query)
        {
            if (clientId == 0) return null;
            return query.Where(payment => payment.Invoice.ClientId == clientId);
        }

        private IQueryable<Payment>? FilterPaymentByStatus(ApprovalStatus? status, IQueryable<Payment> query)
        {
            if (status == null) return null;
            return query.Where(payment => payment.Status == status);
        }

        private IQueryable<Payment>? FilterPaymentByDateRange(DateTime? startDate, DateTime? endDate, IQueryable<Payment> query)
        {
            if (startDate == null || endDate == null) return null;
            return query.Where(payment => payment.DateCreated.Date >= startDate && payment.DateCreated.Date <= endDate);
        }

        private IQueryable<Payment>? SearchPayment(string? searchValue, IQueryable<Payment> query)
        {
            if (string.IsNullOrEmpty(searchValue)) return null;
            return query.Where(payment =>
                payment.RefNo.Contains(searchValue) ||
                payment.Invoice.InvoiceNo.Contains(searchValue) ||
                (payment.Invoice.Client.User.FirstName + " " + payment.Invoice.Client.User.LastName).Contains(searchValue) ||
                payment.Id.ToString().Contains(searchValue));
        }

        public async Task<PaginatedCountsResponse?> GetPaymentsCountByStatus()
        {
            try
            {
                var counts = await _context.Payments
                    .GroupBy(payment => payment.Status)
                    .Select(group => new {
                        Status = group.Key,
                        Count = group.Count()
                    })
                    .ToListAsync();

                var response = new PaginatedCountsResponse
                {
                    AllCount = counts.Sum(payment => payment.Count),
                    PendingCount = counts
                        .Where(payment => payment.Status == ApprovalStatus.PENDING)
                        .Sum(payment => payment.Count),
                    ApprovedCount = counts
                        .Where(payment => payment.Status == ApprovalStatus.APPROVED)
                        .Sum(payment => payment.Count),
                    RejectedCount = counts
                        .Where(payment => payment.Status == ApprovalStatus.REJECTED)
                        .Sum(payment => payment.Count)
                };
                return response;
            }
            catch
            {
                return null;
            }
        }

        public async Task<GeneralResponse<PaymentDTO>> CreatePayment(AddPaymentDTO request)
        {
            try
            {
                Guid.TryParse(UserUtils.GetUserId(_contextAccessor), out Guid userId);
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponseWData<PaymentDTO>("Unauthorized access.", HttpStatusCode.Unauthorized);

                var newPayment = new Payment
                {
                    RefNo = request.RefNo,
                    Amount = request.Amount,
                    BankType = request.BankType,
                    Description = request.Description,
                    Status = role == UserRoles.ADMIN ? ApprovalStatus.APPROVED : ApprovalStatus.PENDING,
                    ProofOfPayments = request.ProofOfPayments,
                    CreatedBy = userId,
                    DateCreated = TimeUtils.PHTime(),
                    InvoiceId = request.InvoiceId,

                };
                _context.Payments.Add(newPayment);

                Invoice? dbInvoice = await _context.Invoices
                    .Where(invoice => invoice.Id == request.InvoiceId)
                    .Include(invoice => invoice.Payments)
                    .FirstOrDefaultAsync();

                dbInvoice.Status = dbInvoice.TotalAmount == dbInvoice.Payments.Where(payment => payment.Status == ApprovalStatus.APPROVED).Sum(payment => payment.Amount) ? InvoiceStatus.PAID : dbInvoice.Status;
                
                int result = await _context.SaveChangesAsync();

                if (role == UserRoles.ADMIN) await UpdateInvoiceStatus(request.InvoiceId);
                return result > 0
                    ? ResponseHelper.SuccessResponseWData(ModelMapper.ToPaymentDTO(newPayment))
                    : ResponseHelper.ErrorResponseWData<PaymentDTO>("Failed to save payment to the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponseWData<PaymentDTO>(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<GeneralResponse<object>> UpdatePaymentStatus(UpdatePaymentStatusDTO request)
        {
            try
            {
                Guid.TryParse(UserUtils.GetUserId(_contextAccessor), out Guid userId);
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponse("Unauthorized access.", HttpStatusCode.Unauthorized);

                Payment? dbPayment = await _context.Payments
                    .FirstOrDefaultAsync(payment => payment.Id == request.PaymentId);

                if (dbPayment == null) return ResponseHelper.ErrorResponse("Payment not found.", HttpStatusCode.NotFound);

                dbPayment.ApprovalDate = TimeUtils.PHTime();
                dbPayment.ApprovedBy = userId;
                dbPayment.Status = request.Status;
                dbPayment.RejectReason = request.Reason;
                dbPayment.ApprovedByName = await _context.Users
                    .Where(user => user.Id == userId)
                    .Select(user => $"{user.FirstName} {user.LastName}")
                    .FirstOrDefaultAsync() ?? "Unknown";

                int result = await _context.SaveChangesAsync();
                if (request.Status == ApprovalStatus.APPROVED) await UpdateInvoiceStatus(dbPayment.InvoiceId);

                return result > 0
                    ? ResponseHelper.SuccessResponse()
                    : ResponseHelper.ErrorResponse("Failed to update payment status.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
            
        private async Task UpdateInvoiceStatus(int invoiceId)
        {
            Invoice? dbInvoice = await _context.Invoices
                .Where(invoice => invoice.Id == invoiceId)
                .Include(invoice => invoice.Payments)
                .FirstOrDefaultAsync();

            if (dbInvoice == null) return;

            dbInvoice.Status = dbInvoice.TotalAmount == dbInvoice.Payments.Where(payment => payment.Status == ApprovalStatus.APPROVED).Sum(payment => payment.Amount) ? InvoiceStatus.PAID : dbInvoice.Status;
        }
    }
}
