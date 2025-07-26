
namespace InvoiceMe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet("list")]
        public async Task<ActionResult<List<ClientDTO>>> GetClientsList()
        {
            List<ClientDTO>? response = await _clientService.GetClientsList();
            return response == null || response.Count == 0 ? NoContent() : Ok(response);
        }
    }
}
