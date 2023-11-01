namespace Otomobil.DTOs.User
{
    public class PutUser
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool? IsActivated { get; set; }
    }
}
