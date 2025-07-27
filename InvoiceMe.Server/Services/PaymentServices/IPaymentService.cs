
namespace InvoiceMe.Server.Services.PaymentServices
{
    public interface IPaymentService
    {
        Task<PaginatedTableResponse<PaymentDTO>> GetPaymentsPaginated(GetPaginatedDTO request);
        Task<PaginatedCountsResponse?> GetPaymentsCountByStatus();
        Task<GeneralResponse<PaymentDTO>> CreatePayment(AddPaymentDTO request);
        Task<GeneralResponse<object>> UpdatePaymentStatus(UpdatePaymentStatusDTO request);
    }
}
