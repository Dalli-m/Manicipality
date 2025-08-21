namespace MunicipalityBackend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http; 

public class ServiceRequestDto
{
    public string ServiceType { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ContactInfo { get; set; } = string.Empty;
    public string Urgency { get; set; } = "medium";
}