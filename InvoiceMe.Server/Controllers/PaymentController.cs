
namespace InvoiceMe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<PaginatedTableResponse<PaymentDTO>>> GetPaymentsPaginated([FromQuery] GetPaginatedDTO request)
        {
            PaginatedTableResponse<PaymentDTO> response = await _paymentService.GetPaymentsPaginated(request);
            return response.Count > 0 ? Ok(response) : NoContent();
        }

        [HttpGet("counts")]
        public async Task<ActionResult<PaginatedCountsResponse>> GetPaymentCountsByStatus()
        {
            PaginatedCountsResponse? response = await _paymentService.GetPaymentsCountByStatus();
            return response != null ? Ok(response) : NoContent();
        }

        [HttpPost("add")]
        public async Task<ActionResult<GeneralResponse<PaymentDTO>>> CreatePayment([FromBody] AddPaymentDTO request)
        {
            GeneralResponse<PaymentDTO> response = await _paymentService.CreatePayment(request);
            return ResponseHelper.GetStatusResponseWData(response);
        }

        [HttpPut("status/update")]
        public async Task<ActionResult<GeneralResponse<object>>> UpdatePaymentStatus([FromBody] UpdatePaymentStatusDTO request)
        {
            GeneralResponse<object> response = await _paymentService.UpdatePaymentStatus(request);
            return ResponseHelper.GetStatusResponse(response);
        }
    }
}
