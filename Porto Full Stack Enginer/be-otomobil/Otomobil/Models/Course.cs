using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Otomobil.Models
{
    public class Course
    {
        public int IdCourse { get; set; }

        public string Name { get; set; } = string.Empty;

        public byte[]? Image { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int FkIdCategory { get; set; }

        public string Category { get; set; } = string.Empty;

        public bool? IsActivated { get; set; }
    }
}
