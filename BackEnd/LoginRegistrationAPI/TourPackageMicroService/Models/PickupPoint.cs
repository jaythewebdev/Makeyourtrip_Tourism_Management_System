using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

namespace TourPackageMicroService.Models
{
    public class PickupPoint
    {
        [Key]
        public int PickupPointId { get; set; }

        public int TourId { get; set; }
        [ForeignKey("TourId")]
        [JsonIgnore]

        public TourDetails? Tour { get; set; }

        [Required]
        [MaxLength(100)]
        public string Location { get; set; }
        [Required]
        public DateTime PickupTime { get; set; }

    }
}
