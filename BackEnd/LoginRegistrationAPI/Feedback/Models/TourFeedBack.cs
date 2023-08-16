using System.ComponentModel.DataAnnotations;

namespace Feedback.Models
{
    public class TourFeedBack
    {

        [Key]
        public int FeedbackId { get; set; }

        [Required]
        [MaxLength(100)]
        public string TravellerName { get; set; }
        [Required]
        [MaxLength(100)]
        public string TouristSpotName { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        public string FeedbackText { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        public DateTime DateSubmitted { get; set; }
    
    }
}
