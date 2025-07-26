namespace InvoiceMe.Server.Data.DTOs.InvoiceDTOs
{
    public class InvoiceItemDTO
    {
        public string Title { get; set; } = string.Empty;
        public int Qty { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; } = 0;
    }
}
