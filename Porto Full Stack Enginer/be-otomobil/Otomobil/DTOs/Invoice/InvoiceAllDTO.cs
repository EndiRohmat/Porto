namespace Otomobil.DTOs.Invoice
{
    public class InvoiceAllDTO
    {
        public Guid IdInvoice { get; set; }
        //public byte[] Invoice { get; set; }

        public int IdOto { get; set; }

        public int Total_course { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
