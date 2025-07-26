
namespace InvoiceMe.Server.Services.ClientServices
{
    public interface IClientService
    {
        Task<List<ClientDTO>?> GetClientsList();
    }
}
