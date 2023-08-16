using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models.DTO
{
    public class StatusDTO
    {
        [Required]
        public string EmailId { get; set; }
        public string Status { get; set; }
    }
}
