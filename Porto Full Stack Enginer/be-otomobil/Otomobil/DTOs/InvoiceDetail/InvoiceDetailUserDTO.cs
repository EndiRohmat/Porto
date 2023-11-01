namespace Otomobil.DTOs.InvoiceDetail
{
    public class InvoiceDetailUserDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public DateTime Date { get; set; }

        public decimal Price { get; set; }
    }
}
