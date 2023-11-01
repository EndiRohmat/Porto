namespace Otomobil.DTOs.Category
{
    public class CategoryDTO
    {
        public string Name { get; set; } = string.Empty;

        public byte[]? Image { get; set; }

        public string? Description { get; set; }

        public bool? IsActivated { get; set; }
    }
}
