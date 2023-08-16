using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models.DTO
{
    public class AdminRegisterDTO:Admin
    {
        [Required]
        public string PasswordClear { get; set; }
    }
}
