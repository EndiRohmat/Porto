namespace Otomobil.DTOs.User
{
    public class AllUser
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool? IsActivated { get; set; }
    }
}
