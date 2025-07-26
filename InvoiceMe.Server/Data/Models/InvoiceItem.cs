namespace InvoiceMe.Server.Data.Models
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Qty { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; } = 0;


        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
    }
}
