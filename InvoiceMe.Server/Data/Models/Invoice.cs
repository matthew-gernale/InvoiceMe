namespace InvoiceMe.Server.Data.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; } = DateTime.Now;
        public DateTime? DueDate { get; set; }
        public InvoiceStatus Status { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Tax { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        [JsonIgnore]
        public List<InvoiceItem>? InvoiceItems { get; set; }

        [JsonIgnore]
        public List<Payment>? Payments { get; set; }
    }
}
