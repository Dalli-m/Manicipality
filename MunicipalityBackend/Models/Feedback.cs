// Models/Feedback.cs
using System.ComponentModel.DataAnnotations;

public class Feedback
{
    public int Id { get; set; }
    
    [Required]
    public string FeedbackType { get; set; } // "general", "suggestion", "complaint", etc.
    
    [Required]
    public string Message { get; set; }
    
    [EmailAddress]
    public string ContactEmail { get; set; }
    
    [Range(1, 5)]
    public int? Rating { get; set; }
    public bool AllowContact { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}