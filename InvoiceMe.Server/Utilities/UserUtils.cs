namespace InvoiceMe.Server.Utilities
{
    public class UserUtils
    {
        public static string? GetUserRole(IHttpContextAccessor _httpContextAccessor) => _httpContextAccessor.HttpContext?.User
           .FindFirstValue(ClaimTypes.Role);

        public static string? GetUserId(IHttpContextAccessor _httpContextAccessor) => _httpContextAccessor.HttpContext?.User
           .FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
