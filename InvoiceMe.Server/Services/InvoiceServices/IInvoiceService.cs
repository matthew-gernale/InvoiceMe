namespace InvoiceMe.Server.Services.InvoiceServices
{
    public interface IInvoiceService
    {
        Task<PaginatedTableResponse<InvoiceDTO>> GetInvoicesPaginated(GetPaginatedDTO request);
        Task<PaginatedCountsResponse?> GetInvoiceCountsByStatus();
        Task<InvoiceDetailsDTO?> GetInvoiceDetailsById(int invoiceId);
        Task<GeneralResponse<object>> CreateInvoice(CreateInvoiceDTO request);
        Task<GeneralResponse<object>> UpdateInvoiceStatus(UpdateInvoiceStatusDTO request);
    }
}
