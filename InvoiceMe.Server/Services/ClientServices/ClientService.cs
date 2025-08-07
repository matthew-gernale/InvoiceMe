

namespace InvoiceMe.Server.Services.ClientServices
{
    public class ClientService : IClientService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _contextAccessor;

        public ClientService(DataContext context, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        public async Task<List<ClientDTO>?> GetClientsList()
        {
            try
            {
                List<ClientDTO>? dbClients = await _context.Clients
                    .Where(client => client.User.IsActive)
                    .Select(client => new ClientDTO 
                    {
                        Id = client.Id,
                        Name = $"{client.User.FirstName} {client.User.LastName}",
                        Contact = client.User.Phone,
                        Email = client.User.Email,
                    })
                    .ToListAsync();

                return dbClients;
            }
            catch
            {
                return null;
            }
        }

        public async Task<PaginatedTableResponse<ClientDTO>> GetClientsPaginated(GetPaginatedDTO request)
        {
            var response = new PaginatedTableResponse<ClientDTO>();
            try
            {
                IQueryable<User> query = _context.Users
                    .AsNoTracking()
                    .Where(user => user.Role == UserRoles.CLIENT)
                    .Include(user => user.Client);

                IQueryable<User>? filterQuery = FilterClientByActiveStatus(request.IsSoftDeleted, query);
                if (filterQuery != null) query = filterQuery;

                IQueryable<User>? searchQuery = SearchClient(request.SearchValue, query);
                if (searchQuery != null) query = searchQuery;

                response.Count = await query.CountAsync();
                if (response.Count == 0) return response;

                List<User> dbClients = await query
                    .Skip(request.Skip)
                    .Take(request.Take)
                    .ToListAsync();

                response.ResponseData = dbClients
                    .Select(user => new ClientDTO
                    {
                        Id = user.Client?.Id ?? 0,
                        Name = $"{user.FirstName} {user.LastName}",
                        Contact = user.Phone,
                        Email = user.Email,
                    })
                    .OrderByDescending(user => user.Name)
                    .ToList();

                return response;
            }
            catch
            {
                return response;
            }
        }

        public async Task<ClientDTO?> GetClientById(int clientId)
        {
            try
            {
                ClientDTO? dbClient = await _context.Users
                    .AsNoTracking()
                    .Where(user => user.Client.Id == clientId)
                    .Select(user => new ClientDTO
                    {
                        Id = user.Client.Id,
                        Name = $"{user.FirstName} {user.LastName}",
                        Contact = user.Phone,
                        Email = user.Email,
                        Address = user.Address
                    })
                    .FirstOrDefaultAsync();

                return dbClient;
            }
            catch
            {
                return null;
            }
        }

        private IQueryable<User> FilterClientByActiveStatus(bool isSoftDeleted, IQueryable<User> query)
        {
            return query = query.Where(user => user.IsActive == isSoftDeleted ? false : true);
        }

        private IQueryable<User>? SearchClient(string? searchValue, IQueryable<User> query)
        {
            if (string.IsNullOrEmpty(searchValue)) return null;
            return query.Where(user =>
                (user.FirstName + " " + user.LastName).Contains(searchValue) ||
                user.Email.Contains(searchValue) ||
                user.Phone.Contains(searchValue) ||
                user.Id.ToString().Contains(searchValue));
        }

        public async Task<GeneralResponse<int>> CreateClient(AddClientDTO request)
        {
            try
            {
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponseWData<int>("Unauthorized access.", HttpStatusCode.Unauthorized);

                var newUser = new User
                {
                    Email = request.Email,
                    Role = UserRoles.CLIENT,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Address = request.Address,
                    Phone = request.Phone,
                };
                _context.Users.Add(newUser);

                var newClient = new Client
                {
                    User = newUser,
                    UserId = newUser.Id
                };
                _context.Clients.Add(newClient);

                int result = await _context.SaveChangesAsync();
                return result > 0
                    ? ResponseHelper.SuccessResponseWData(newClient.Id)
                    : ResponseHelper.ErrorResponseWData<int>("Failed to save new client to the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponseWData<int>(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<GeneralResponse<object>> UpdateClientDetails(UpdateClientDetailsDTO request)
        {
            try
            {
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponse("Unauthorized access.", HttpStatusCode.Unauthorized);

                User? dbUser = await _context.Users
                    .FirstOrDefaultAsync(user => user.Client.Id == request.ClientId);

                if (dbUser == null) return ResponseHelper.ErrorResponse("Client not found.", HttpStatusCode.NotFound);

                dbUser.Email = request.Email;
                dbUser.FirstName = request.FirstName;
                dbUser.LastName = request.LastName;
                dbUser.Address = request.Address;
                dbUser.Phone = request.Phone;

                int result = await _context.SaveChangesAsync();
                return result > 0
                    ? ResponseHelper.SuccessResponse()
                    : ResponseHelper.ErrorResponse("Failed to save client details update to the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<GeneralResponse<object>> UpdateClientActiveStatus(int clientId, bool isActive)
        {
            try
            {
                Enum.TryParse(UserUtils.GetUserRole(_contextAccessor), out UserRoles role);
                if (role != UserRoles.ADMIN) return ResponseHelper.ErrorResponse("Unauthorized access.", HttpStatusCode.Unauthorized);

                User? dbUser = await _context.Users
                    .FirstOrDefaultAsync(user => user.Client.Id == clientId);

                if (dbUser == null) return ResponseHelper.ErrorResponse("Client not found.", HttpStatusCode.NotFound);

                dbUser.IsActive = isActive;

                int result = await _context.SaveChangesAsync();
                return result > 0
                    ? ResponseHelper.SuccessResponse()
                    : ResponseHelper.ErrorResponse($"Failed to {(isActive ? "recover" : "delete")} client to the database.", HttpStatusCode.Conflict);
            }
            catch (Exception ex)
            {
                return ResponseHelper.ErrorResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}
