using System.ComponentModel.DataAnnotations;

namespace TourPackageMicroservice.Models
{
    public class Exclusions
    {
        [Key]
        public  int ExclusionId { get; set; }
        [Required]
        [MaxLength(200)]
        public string? ExclusionDescription { get; set; }
        public ICollection<TourExclusion>? TourExclusion { get; set; }

    }
}
