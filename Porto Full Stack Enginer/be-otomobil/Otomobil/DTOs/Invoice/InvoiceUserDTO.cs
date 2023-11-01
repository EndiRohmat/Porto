namespace Otomobil.DTOs.Invoice
{
    public class InvoiceUserDTO
    {
        public Guid IdInvoice { get; set; }
        //public byte[] Invoice { get; set; } 

        public int Invoice { get; set; } 
        public int Total_course { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string Fk_id_user { get; set; } = string.Empty;
    }
}
