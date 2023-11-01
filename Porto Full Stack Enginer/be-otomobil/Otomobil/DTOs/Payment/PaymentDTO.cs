namespace Otomobil.DTOs.Payment
{
    public class PaymentDTO
    {
        public string Payment_name { get; set; } = string.Empty;
        public byte[]? Image { get; set; }
        public bool isActivated { get; set; }
    }
}
