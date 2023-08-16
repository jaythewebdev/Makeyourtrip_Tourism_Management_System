using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? EmailId { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
        public string? Role { get; set; }
    }
}
