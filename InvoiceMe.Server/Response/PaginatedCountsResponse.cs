namespace InvoiceMe.Server.Response
{
    public class PaginatedCountsResponse
    {
        public int AllCount { get; set; }
        public int PendingCount { get; set; }
        public int ApprovedCount { get; set; }
        public int RejectedCount { get; set; }
        public int CancelledCount { get; set; }
        public int DoneCount { get; set; }
        public int PreparingCount { get; set; }
        public int PickupCount { get; set; }
        public int ReadyCount { get; set; }
        public int ArrivedCount { get; set; }
    }
}
