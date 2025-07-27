namespace InvoiceMe.Server.Data.DTOs.PaymentDTOs
{
    public class AddPaymentDTO
    {
        public string RefNo { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; } = 0;
        public BankType BankType { get; set; } = BankType.CASH;
        public string Description { get; set; } = string.Empty;
        public List<string>? ProofOfPayments { get; set; }

        public int InvoiceId { get; set; }
    }
}
