namespace Otomobil.DTOs.Cart
{
    public class ListCartDTO
    {
        public int IdCart { get; set; }
        public int IdSchedule { get; set; }
        public Guid IdUser { get; set; }
        public string Category { get; set; } = string.Empty;
        public string nameCourse { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
        public byte[]? Image { get; set; }
    }
}
