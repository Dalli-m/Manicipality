using System.ComponentModel.DataAnnotations;

public class ServiceRequest
{
    public int Id { get; set; }
    
    [Required]
    public string ServiceType { get; set; } 
    
    [Required]
    public string Location { get; set; }
    
    [Required]
    public string Description { get; set; }
    
    [Required]
    public string ContactInfo { get; set; }
    
    public string Urgency { get; set; } = "medium"; 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string Status { get; set; } = "Pending";
    public string? AdminComments { get; internal set; }
    public string? UserId { get; internal set; }
}