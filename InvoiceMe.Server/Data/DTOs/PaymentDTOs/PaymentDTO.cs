namespace InvoiceMe.Server.Data.DTOs.PaymentDTOs
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public string Client { get; set; } = string.Empty;
        public string RefNo { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; } = 0;
        public BankType BankType { get; set; } = BankType.CASH;
        public string Description { get; set; } = string.Empty;
        public ApprovalStatus Status { get; set; } = ApprovalStatus.PENDING;
        public string RejectReason { get; set; } = string.Empty;
        public List<string>? ProofOfPayments { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string ApprovedByName { get; set; } = string.Empty;
        public DateTime? ApprovalDate { get; set; }
    }
}
