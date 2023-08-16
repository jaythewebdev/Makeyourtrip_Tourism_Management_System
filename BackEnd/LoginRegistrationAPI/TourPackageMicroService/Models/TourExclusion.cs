using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

public class TourExclusion
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]
    public TourDetails? TourDetails { get; set; }
    [Required]
    public int ExclusionId { get; set; }
    [ForeignKey("ExclusionId")]
    [JsonIgnore]
    public Exclusions? Exclusions{ get; set; }


}
