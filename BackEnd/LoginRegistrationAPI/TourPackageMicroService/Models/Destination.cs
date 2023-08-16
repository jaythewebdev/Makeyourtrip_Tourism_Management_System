using System.ComponentModel.DataAnnotations;

public class Destination
{
    [Key]
    public int DestinationId { get; set; }

    [Required]
    [MaxLength(100)]
    public string? DestinationCityName { get; set; }

    [Required]
    [MaxLength(100)]
    public string? Country { get; set; }

    public ICollection<TourDestination>? TourDestinations { get; set; }


}
