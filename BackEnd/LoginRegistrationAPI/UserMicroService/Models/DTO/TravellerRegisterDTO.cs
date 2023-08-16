using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models.DTO
{
    public class TravellerRegisterDTO:Traveller
    {
        [Required]
        public string? PasswordClear { get; set; }
    }
}
