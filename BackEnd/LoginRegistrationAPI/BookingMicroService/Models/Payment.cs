using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BookingMicroService.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        [Required]
        public DateTime PaymentDay { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Payment amount must be greater than 0.")]
        public float PaymentAmount { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Discount amount must be greater than or equal to 0.")]
        public float? DiscountAmount { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Wallet amount must be greater than or equal to 0.")]
        public float? WalletAmount { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Net payable amount must be greater than 0.")]
        public float NetPayableAmount { get; set; }

        public string? PaymentStatus { get; set; }

        public int BookingId { get; set; }
        [ForeignKey("BookingId")]
        [JsonIgnore]
        public Booking? Booking { get; set; }
    }
}
