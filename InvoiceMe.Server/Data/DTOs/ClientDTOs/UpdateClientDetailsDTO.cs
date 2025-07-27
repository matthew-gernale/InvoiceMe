namespace InvoiceMe.Server.Data.DTOs.ClientDTOs
{
    public class UpdateClientDetailsDTO
    {
        public int ClientId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
