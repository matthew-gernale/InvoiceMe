namespace InvoiceMe.Server.Data.DTOs.InvoiceDTOs
{
    public class CreateInvoiceDTO
    {
        public DateTime? DueDate { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }
        public int ClientId { get; set; }

        public List<InvoiceItemDTO> Items { get; set; }
    }
}
