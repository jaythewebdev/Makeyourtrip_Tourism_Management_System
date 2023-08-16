using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

namespace TourPackageMicroService.Models
{
    public class Itinerary
    {
        [Key]
        public int ItineraryId { get; set; }

        public int TourId { get; set; }
        [ForeignKey("TourId")]
        [JsonIgnore]
        public TourDetails? Tour { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Day number must be a positive integer.")]
        public int DayNumber { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public int DestinationId { get; set; }
        [ForeignKey("DestinationId")]
        [JsonIgnore]
        public Destination? Destination { get; set; }

        public ICollection<DailySchedule> DailySchedules { get; set; }

    }
}
