namespace InvoiceMe.Server.Services.ClientServices
{
    public class ClientService : IClientService
    {
        private readonly DataContext _context;

        public ClientService(DataContext context)
        {
            _context = context;
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
    }
}
