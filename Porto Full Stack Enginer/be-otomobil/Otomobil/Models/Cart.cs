namespace Otomobil.Models
{
    public class Cart
    {
        public int IdCart { get; set; }
        public string Fk_id_user { get; set; } = string.Empty;
        public int Fk_id_schedule { get; set; } 

    }
}
