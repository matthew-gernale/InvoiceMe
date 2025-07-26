namespace InvoiceMe.Server.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public UserRoles Role { get; set; }
        public string VerificationToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime RefreshTokenCreatedAt { get; set; }
        public DateTime RefreshTokenExpiresAt { get; set; }

        // User Details

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;



        public Client? Client { get; set; }
    }
}
