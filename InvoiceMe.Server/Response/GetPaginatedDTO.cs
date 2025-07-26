
namespace InvoiceMe.Server.Response
{
    public class GetPaginatedDTO
    {
        public int Take { get; set; } = 10;
        public int Skip { get; set; } = 0;
        public string? SearchValue { get; set; }
        public string? SearchLocation { get; set; }
        public string UserId { get; set; } = string.Empty;

        public ApprovalStatus? ApprovalStatus { get; set; }
        public BankType? BankType { get; set; }
        public UserRoles? UserRoles { get; set; }
        public DateStatus? DateStatus { get; set; }

        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }

        public int CustomerId { get; set; }
    }
}
