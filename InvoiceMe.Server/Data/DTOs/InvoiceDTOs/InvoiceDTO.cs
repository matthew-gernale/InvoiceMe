namespace InvoiceMe.Server.Data.DTOs.InvoiceDTOs
{
    public class InvoiceDTO
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public InvoiceStatus Status { get; set; }
        public bool IsOverDue { get; set; }
        public decimal Total { get; set; }
    }
}
