using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

namespace TourPackageMicroService.Models
{
    public class DailySchedule
    {
        [Key]
        public int ScheduleId { get; set; }

        public int ItineraryId { get; set; }
        [ForeignKey("ItineraryId")]
        [JsonIgnore]
        public Itinerary? Itinerary { get; set; }

        [Required]
        [MaxLength(50)]
        public string Timing { get; set; }

        [Required]
        [MaxLength(100)]
        public string Activity { get; set; }

        [Required]
        [MaxLength(100)]
        public string Place { get; set; }

    }
}
