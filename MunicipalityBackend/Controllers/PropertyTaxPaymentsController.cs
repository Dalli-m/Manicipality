using Microsoft.AspNetCore.Mvc;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MunicipalityBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyTaxPaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PropertyTaxPaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<PropertyTaxPayment>> CreatePropertyTaxPayment([FromBody] PropertyTaxPaymentDto paymentDto)
        {
            var payment = new PropertyTaxPayment
            {
                ParcelNumber = paymentDto.ParcelNumber,
                OwnerName = paymentDto.OwnerName,
                PaymentAmount = paymentDto.PaymentAmount,
                Email = paymentDto.Email,
                PaymentDate = DateTime.UtcNow,
                TransactionId = Guid.NewGuid().ToString(),
                Status = "Completed"
            };

            _context.PropertyTaxPayments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPropertyTaxPayment), new { id = payment.Id }, payment);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyTaxPayment>> GetPropertyTaxPayment(int id)
        {
            var payment = await _context.PropertyTaxPayments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyTaxPayment>>> GetPropertyTaxPayments()
        {
            return await _context.PropertyTaxPayments.ToListAsync();
        }
    }
}