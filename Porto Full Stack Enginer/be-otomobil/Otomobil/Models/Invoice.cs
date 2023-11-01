namespace Otomobil.Models
{
    public class Invoice
    {
        public Guid IdInvoice { get; set; }
        public int NoInvoice { get; set; }
        public int Total_course { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string Fk_id_user { get; set; } = string.Empty;
    }
}
