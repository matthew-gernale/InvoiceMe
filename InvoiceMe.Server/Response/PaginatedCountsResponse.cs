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
        
        public int ToBePaidCount { get; set; }
        public int OverdueCount { get; set; }
        public int PaidCount { get; set; }
    }
}
