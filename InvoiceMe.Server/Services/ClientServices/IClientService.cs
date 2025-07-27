
namespace InvoiceMe.Server.Services.ClientServices
{
    public interface IClientService
    {
        Task<List<ClientDTO>?> GetClientsList();
        Task<PaginatedTableResponse<ClientDTO>> GetClientsPaginated(GetPaginatedDTO request);
        Task<ClientDTO?> GetClientById(int clientId);
        Task<GeneralResponse<int>> CreateClient(AddClientDTO request);
        Task<GeneralResponse<object>> UpdateClientDetails(UpdateClientDetailsDTO request);
        Task<GeneralResponse<object>> UpdateClientActiveStatus(int clientId, bool isActive);
    }
}
