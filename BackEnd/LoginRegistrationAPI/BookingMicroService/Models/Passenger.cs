using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BookingMicroService.Models
{
    public class Passenger
    {
        [Key]
        public int PassengerId { get; set; }
        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Required]
        [Range(0, 120, ErrorMessage = "Age must be between 0 and 120.")]
        public int Age { get; set; }

        [Required]
        public string? Gender { get; set; }

        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public Booking? Booking { get; set; }
    }
}
