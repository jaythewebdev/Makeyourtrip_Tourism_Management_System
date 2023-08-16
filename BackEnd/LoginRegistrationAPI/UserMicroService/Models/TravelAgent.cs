using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace UserMicroService.Models
{
    public class TravelAgent
    {
        [Key]
        public int AgentId { get; set; }
        [ForeignKey("AgentId")]
        public User? User { get; set; }

        [Required(ErrorMessage = "Agency Name is required")]
        [MinLength(4, ErrorMessage = "Agency Name must be atleast 4 characters long")]
        public string? AgencyName { get; set; }

        [Required(ErrorMessage = "Contact Person Name is required")]
        [MinLength(4, ErrorMessage = "Contact Person Name must be atleast 4 characters long")]
        public string? ContactPersonName { get; set; }

        [Required(ErrorMessage = "Mobile number is required")]
        [Phone(ErrorMessage = "Invalid phone number.")]
        public string? PhoneNumber { get; set; }


        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string? EmailId { get; set; }

        [Required(ErrorMessage = "Street is required")]
        public string? Street { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string? City { get; set; }
        [Required(ErrorMessage = "State is required")]
        public string? State { get; set; }
        [Required(ErrorMessage = "Country is required")]
        public string? Country { get; set; }
        public string? Status { get; set; }
    }
}
