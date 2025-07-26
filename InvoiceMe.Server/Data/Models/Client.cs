namespace InvoiceMe.Server.Data.Models
{
    public class Client
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        [JsonIgnore]
        public List<Invoice>? Invoices { get; set; }
    }
}
