namespace Otomobil.Models
{
    public class InvoiceDetail
    {
        public int Id_detail { get; set; }
        public string Fk_id_invoice { get; set; } = string.Empty;
        public int Fk_id_schedule { get; set; } 
    }
}
