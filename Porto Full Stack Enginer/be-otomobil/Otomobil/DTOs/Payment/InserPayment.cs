namespace Otomobil.DTOs.Payment
{
    public class InserPayment
    {
        public string Payment_name { get; set; } = string.Empty;
        public byte[]? Image { get; set; }
        public int isActivated { get; set; }
    }
}
