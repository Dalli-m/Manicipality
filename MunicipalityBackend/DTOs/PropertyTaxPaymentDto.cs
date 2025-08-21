using System.ComponentModel.DataAnnotations;

namespace MunicipalityBackend.DTOs
{
    public class PropertyTaxPaymentDto
    {
        [Required(ErrorMessage = "Parcel number is required")]
        public string ParcelNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Owner name is required")]
        public string OwnerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Payment amount is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0")]
        public decimal PaymentAmount { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;
    }
}