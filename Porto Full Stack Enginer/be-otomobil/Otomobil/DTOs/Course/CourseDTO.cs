namespace Otomobil.DTOs.Course
{
    public class CourseDTO
    {

        public string Name { get; set; } = string.Empty;

        public byte[]? Image { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int FkIdCategory { get; set; }

        public bool? IsActivated { get; set; }
    }
}
