namespace MunicipalityBackend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http; 

public class FeedbackDto
{
    public string FeedbackType { get; set; } = "general";
    public string Message { get; set; } = string.Empty;
    public string? ContactEmail { get; set; }
    public int? Rating { get; set; }
    public bool AllowContact { get; set; }
}