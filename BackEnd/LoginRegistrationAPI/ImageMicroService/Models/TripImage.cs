using static System.Net.Mime.MediaTypeNames;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Threading.Channels;

namespace ImageMicroService.Models
{
    public class TripImage
    {
        [Key]
        public int ImageId { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")] // Define foreign key relationship
        public  Category? Category { get; set; }

        [MaxLength(100)]
        public string? ImageName { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

    }
}

