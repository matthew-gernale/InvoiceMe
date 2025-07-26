
namespace InvoiceMe.Server.Response
{
    public class GeneralResponse<T>
    {
        public bool IsSuccess { get; set; }
        public string FailedMessage { get; set; } = string.Empty;
        public HttpStatusCode StatusCode { get; set; }
        public T? Data { get; set; }
    }
}
