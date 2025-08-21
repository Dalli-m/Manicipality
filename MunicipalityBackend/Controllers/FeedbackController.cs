using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;

namespace MunicipalityBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FeedbackController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacks()
    {
        return await _context.Feedbacks
            .OrderByDescending(f => f.CreatedAt)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Feedback>> CreateFeedback([FromBody] FeedbackDto feedbackDto)
    {
        var feedback = new Feedback
        {
            FeedbackType = feedbackDto.FeedbackType,
            Message = feedbackDto.Message,
            ContactEmail = feedbackDto.ContactEmail,
            Rating = feedbackDto.Rating,
            AllowContact = feedbackDto.AllowContact,
            CreatedAt = DateTime.UtcNow
        };

        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFeedback), new { id = feedback.Id }, feedback);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Feedback>> GetFeedback(int id)
    {
        var feedback = await _context.Feedbacks.FindAsync(id);

        if (feedback == null)
        {
            return NotFound();
        }

        return feedback;
    }
}