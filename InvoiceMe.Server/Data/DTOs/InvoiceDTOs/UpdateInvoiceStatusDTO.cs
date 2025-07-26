namespace InvoiceMe.Server.Data.DTOs.InvoiceDTOs
{
    public class UpdateInvoiceStatusDTO
    {
        public int InvoiceId { get; set; }
        public InvoiceStatus Status { get; set; }
    }
}
