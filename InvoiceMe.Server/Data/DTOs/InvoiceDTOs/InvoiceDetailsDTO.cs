namespace InvoiceMe.Server.Data.DTOs.InvoiceDTOs
{
    public class InvoiceDetailsDTO
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public DateTime? DueDate { get; set; }
        public InvoiceStatus Status { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public List<InvoiceItemDTO> InvoiceItems { get; set; } = new List<InvoiceItemDTO>();
    }
}
