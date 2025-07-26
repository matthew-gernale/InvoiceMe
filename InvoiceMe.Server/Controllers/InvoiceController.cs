
namespace InvoiceMe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<PaginatedTableResponse<InvoiceDTO>>> GetInvoicesPaginated([FromQuery] GetPaginatedDTO request)
        {
            PaginatedTableResponse<InvoiceDTO> response = await _invoiceService.GetInvoicesPaginated(request);
            return response.Count > 0 ? Ok(response) : NoContent();
        }

        [HttpGet("counts")]
        public async Task<ActionResult<PaginatedCountsResponse>> GetInvoiceCountsByStatus()
        {
            PaginatedCountsResponse? response = await _invoiceService.GetInvoiceCountsByStatus();
            return response != null ? Ok(response) : NoContent();
        }

        [HttpGet("{invoiceId}")]
        public async Task<ActionResult<InvoiceDetailsDTO>> GetInvoiceDetailsById(int invoiceId)
        {
            InvoiceDetailsDTO? response = await _invoiceService.GetInvoiceDetailsById(invoiceId);
            return response != null ? Ok(response) : NoContent();
        }

        [HttpPost("add")]
        public async Task<ActionResult<GeneralResponse<object>>> CreateInvoice([FromBody] CreateInvoiceDTO request)
        {
            GeneralResponse<object> response = await _invoiceService.CreateInvoice(request);
            return ResponseHelper.GetStatusResponseWData(response);
        }

        [HttpPut("update")]
        public async Task<ActionResult<GeneralResponse<object>>> UpdateInvoiceStatus([FromBody] UpdateInvoiceStatusDTO request)
        {
            GeneralResponse<object> response = await _invoiceService.UpdateInvoiceStatus(request);
            return ResponseHelper.GetStatusResponse(response);
        }
    }
}
