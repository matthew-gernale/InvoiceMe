
using InvoiceMe.Server.Data.Models;

namespace InvoiceMe.Server.Utilities
{
    public class ModelMapper
    {
        public static InvoiceDTO ToInvoiceDTO(Invoice dbInvoice)
        {
            return new InvoiceDTO
            {
                Id = dbInvoice.Id,
                InvoiceNo = dbInvoice.InvoiceNo,
                ClientName = $"{dbInvoice.Client.User.FirstName} {dbInvoice.Client.User.LastName}",
                InvoiceDate = dbInvoice.InvoiceDate,
                Status = dbInvoice.Status,
                IsOverDue = dbInvoice.DueDate.Value.Date <= TimeUtils.PHTime().Date,
                Total = dbInvoice.TotalAmount
            };
        }

        public static InvoiceDetailsDTO ToInvoiceDetailsDTO(Invoice dbInvoice)
        {
            return new InvoiceDetailsDTO
            {
                Id = dbInvoice.Id,
                InvoiceNo = dbInvoice.InvoiceNo,
                ClientName = $"{dbInvoice.Client.User.FirstName} {dbInvoice.Client.User.LastName}",
                InvoiceDate = dbInvoice.InvoiceDate,
                DueDate = dbInvoice.DueDate,
                Status = dbInvoice.Status,
                SubTotal = dbInvoice.Subtotal,
                Tax = dbInvoice.Tax,
                Total = dbInvoice.TotalAmount,
                InvoiceItems = dbInvoice.InvoiceItems?
                    .Select(item => ToInvoiceItemDTO(item))
                    .ToList() ?? new List<InvoiceItemDTO>()
            };
        }

        public static InvoiceItemDTO ToInvoiceItemDTO(InvoiceItem dbInvoiceItem)
        {
            return new InvoiceItemDTO
            {
                Title = dbInvoiceItem.Title,
                Qty = dbInvoiceItem.Qty,
                UnitPrice = dbInvoiceItem.UnitPrice
            };
        }

        public static PaymentDTO ToPaymentDTO(Payment dbPayment)
        {
            return new PaymentDTO
            {
                Id = dbPayment.Id,
                Client = $"{dbPayment.Invoice.Client.User.FirstName} {dbPayment.Invoice.Client.User.LastName}",
                RefNo = dbPayment.RefNo,
                Amount = dbPayment.Amount,
                BankType = dbPayment.BankType,
                Description = dbPayment.Description,
                Status = dbPayment.Status,
                RejectReason = dbPayment.RejectReason,
                ProofOfPayments = dbPayment.ProofOfPayments,
                DateCreated = dbPayment.DateCreated,
                ApprovalDate = dbPayment.ApprovalDate,
                ApprovedByName = dbPayment.ApprovedByName,
            };
        }
    }
}
