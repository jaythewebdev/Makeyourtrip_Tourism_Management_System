using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace BookingMicroService.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        [Required]
        public int TourId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        //[Display(Name = "Booking Date")]
        public DateTime BookingDate { get; set; }

        [Display(Name = "Pickup Point")]
        public string? PickupPoint { get; set; }

        [Display(Name = "Additional Requests")]
        public string? AdditionalRequests { get; set; }

        [Display(Name = "Booking Status")]
        public string? BookingStatus { get; set; }
        public ICollection<Passenger>? Passengers { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }
}
