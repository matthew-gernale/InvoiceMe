
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

        [HttpGet("paginated")]
        public async Task<ActionResult<PaginatedTableResponse<ClientDTO>>> GetClientsPaginated([FromQuery] GetPaginatedDTO request)
        {
            PaginatedTableResponse<ClientDTO> response = await _clientService.GetClientsPaginated(request);
            return response.Count == 0 ? NoContent() : Ok(response);
        }

        [HttpGet("{clientId}")]
        public async Task<ActionResult<ClientDTO>> GetClientById(int clientId)
        {
            ClientDTO? response = await _clientService.GetClientById(clientId);
            return response == null ? NoContent() : Ok(response);
        }

        [HttpPost("add")]
        public async Task<ActionResult<GeneralResponse<int>>> CreateClient([FromBody] AddClientDTO request)
        {
            GeneralResponse<int> response = await _clientService.CreateClient(request);
            return ResponseHelper.GetStatusResponseWData(response);
        }

        [HttpPut("update")]
        public async Task<ActionResult<GeneralResponse<object>>> UpdateClientDetails([FromBody] UpdateClientDetailsDTO request)
        {
            GeneralResponse<object> response = await _clientService.UpdateClientDetails(request);
            return ResponseHelper.GetStatusResponse(response);
        }

        [HttpPut("{clientId}")]
        public async Task<ActionResult<GeneralResponse<object>>> UpdateClientActiveStatus(int clientId, [FromBody] bool isActive)
        {
            GeneralResponse<object> response = await _clientService.UpdateClientActiveStatus(clientId, isActive);
            return ResponseHelper.GetStatusResponse(response);
        }
    }
}
