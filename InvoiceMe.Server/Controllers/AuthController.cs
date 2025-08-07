
namespace InvoiceMe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authRepository;

        public AuthController(IAuthService authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginDTO request)
        {
            LoginResponse response = await _authRepository.Login(request);
            if (string.IsNullOrEmpty(response.AccessToken)) return BadRequest("Invalid Credential");

            Response.Cookies.Append("refreshToken", response.RefreshToken, response.CookieOptions);
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> GenRefreshToken()
        {
            string? refToken = Request.Cookies["refreshToken"];

            LoginResponse? response = await _authRepository.ReRefreshToken(refToken);
            if (response == null) return BadRequest("");
            if (string.IsNullOrEmpty(response.AccessToken)) return BadRequest("");

            Response.Cookies.Append("refreshToken", response.RefreshToken, response.CookieOptions);

            return Ok(response.AccessToken);
        }

        [HttpPost("logout")]
        public async Task<ActionResult<string>> Logout()
        {
            LoginResponse response = _authRepository.Logout();
            Response.Cookies.Append("refreshToken", response.RefreshToken, response.CookieOptions);
            return Ok(response.AccessToken);
        }
    }
}
