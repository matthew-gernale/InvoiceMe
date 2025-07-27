namespace InvoiceMe.Server.Data.DTOs.PaymentDTOs
{
    public class UpdatePaymentStatusDTO
    {
        public int PaymentId { get; set; }
        public ApprovalStatus Status { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}
