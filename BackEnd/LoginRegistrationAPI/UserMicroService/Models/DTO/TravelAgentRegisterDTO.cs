using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models.DTO
{
    public class TravelAgentRegisterDTO:TravelAgent
    {
        [Required]
        public string? PasswordClear { get; set; }
    }
}
