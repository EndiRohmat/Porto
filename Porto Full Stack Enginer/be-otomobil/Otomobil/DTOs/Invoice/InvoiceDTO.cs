namespace Otomobil.DTOs.Invoice
{
    public class InvoiceDTO
    {
        public decimal TotalPrice { get; set; }
        public int Total_course { get; set; }
        public string Fk_id_user { get; set; } = string.Empty;
    }
}
