namespace InvoiceMe.Server.Services.AuthServices
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(LoginDTO request);
        LoginResponse Logout();
        Task<LoginResponse?> ReRefreshToken(string? refToken);
    }
}
