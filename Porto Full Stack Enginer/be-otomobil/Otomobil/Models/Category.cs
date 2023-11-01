﻿namespace Otomobil.Models
{
    public class Category
    {
        public int IdCategory { get; set; }

        public string Name { get; set; } = string.Empty;

        public byte[]? Image { get; set; }

        public string? Description { get; set; }
        public bool? IsActivated { get; set; }
    }
}
