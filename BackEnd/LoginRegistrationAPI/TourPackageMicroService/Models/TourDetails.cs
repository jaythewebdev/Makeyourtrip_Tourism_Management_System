using System.ComponentModel.DataAnnotations;
using TourPackageMicroService.Models;

namespace TourPackageMicroservice.Models
{
    public class TourDetails
    {
        [Key]
        public int TourId { get; set; }
        [Required]
        public int TravelAgentId { get; set; }

        //[Required]
        public string? TourName { get; set; }

        public string? TourDescription { get; set; }

        public string? Tourtype { get; set; }

        [Required]
        public DateTime DepartureDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        public int DurationInDays
        {
            get
            {
                // Ensure that DepartureDate is earlier than or equal to ReturnDate
                if (ReturnDate < DepartureDate)
                {
                    // Swap the dates if they are in the wrong order
                    DateTime temp = DepartureDate;
                    DepartureDate = ReturnDate;
                    ReturnDate = temp;
                }

                // Calculate the duration in days
                TimeSpan duration = ReturnDate - DepartureDate;
                return duration.Days;
            }
        }

        [Required]
        public decimal TourPrice { get; set; }

        [Required]
        public int MaxCapacity { get; set; }
        public int BookedCapacity { get; set; }
        //[Required]
        public string? Availability{get; set;}
        public string? ImageUrl { get; set; }
        public string? AccomodationStatus { get; set; }
        public string? CancellationPolicy { get; set; }
        public int BookingRestriction { get; set; }
        public string? HealthAndSafety { get; set; }

        public ICollection<PickupPoint?>? PickupPoints { get; set; }
        public ICollection<Itinerary?>? Itineraries { get; set; }
        public ICollection<TourDestination?>? TourDestination { get; set; }
        public ICollection<TourInclusion?>? TourInclusion { get; set; }
        public ICollection<TourExclusion?>?   TourExclusion { get; set; }
    }
}
