// Models/BuildingPermit.cs
using System.ComponentModel.DataAnnotations;

public class BuildingPermit
{
    public int Id { get; set; }
    
    [Required]
    public string PermitType { get; set; } // "residential", "commercial", etc.
    
    [Required]
    public string Address { get; set; }
    
    [Required]
    public string ProjectDescription { get; set; }
    
    public List<string> DocumentPaths { get; set; } = new(); // Paths to uploaded documents
    
    [Required, EmailAddress]
    public string ContactEmail { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";
}