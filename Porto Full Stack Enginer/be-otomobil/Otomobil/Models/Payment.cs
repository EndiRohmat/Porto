namespace Otomobil.Models
{
    public class Payment
    {
        public int Id_payment { get; set; }
        public string Payment_name { get; set; } = string.Empty;
        public byte[]? Image { get; set; }
        public bool? IsActivated { get; set; }
    }
}
