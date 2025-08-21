using System.ComponentModel.DataAnnotations;

public class PotholeReport
{
    public int Id { get; set; }

    [Required]
    public string Location { get; set; }

    public string Description { get; set; }

    public string ImagePath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } 
    public string Status { get; set; } = "Pending";
}