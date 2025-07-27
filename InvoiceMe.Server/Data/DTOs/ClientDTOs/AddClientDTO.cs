namespace InvoiceMe.Server.Data.DTOs.ClientDTOs
{
    public class AddClientDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Address is required.")]
        public string Address { get; set; } = string.Empty;
        [Required(ErrorMessage = "Phone number is required.")]
        public string Phone { get; set; } = string.Empty;
    }
}
