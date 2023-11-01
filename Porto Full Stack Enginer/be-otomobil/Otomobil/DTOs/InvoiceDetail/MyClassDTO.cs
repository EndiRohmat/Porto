namespace Otomobil.DTOs.InvoiceDetail
{
    public class MyClassDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public byte[]? Image { get; set; }
    }
}
