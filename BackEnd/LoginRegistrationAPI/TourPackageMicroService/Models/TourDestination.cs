using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TourPackageMicroservice.Models;

public class TourDestination
{
    [Key]
    public int Id { get; set; }

    public int TourId { get; set; }
    [ForeignKey("TourId")]
    [JsonIgnore]
    public TourDetails? Tour { get; set; }

    public int DestinationId { get; set; }
    [ForeignKey("DestinationId")]
    [JsonIgnore]
    public Destination? Destination { get; set; }

    [MaxLength(300)]
    public string? DestinationImage { get; set; }

    [MaxLength(200)]
    public string? DestinationActivity { get; set; }

}
