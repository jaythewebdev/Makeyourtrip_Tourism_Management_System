using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

public class TourInclusion
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]

    public TourDetails? Tour { get; set; }

    [Required]
    public int InclusionId { get; set; }
    [ForeignKey("InclusionId")]
    [JsonIgnore]
    public Inclusions? Inclusions { get; set; }


}
