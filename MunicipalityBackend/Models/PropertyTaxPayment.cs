using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace MunicipalityBackend.Models
{
    public class PropertyTaxPayment
    {
        public int Id { get; set; }

        [Required]
        public string ParcelNumber { get; set; }

        [Required]
        public string OwnerName { get; set; }

        [Required, Range(0.01, double.MaxValue)]
        [Precision(18, 2)]  
        public decimal PaymentAmount { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public string TransactionId { get; set; }
        public string Status { get; internal set; }
    }
}   
