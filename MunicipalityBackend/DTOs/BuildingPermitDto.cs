namespace MunicipalityBackend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http; 

public class BuildingPermitDto
{
    public string PermitType { get; set; } = "residential";
    public string Address { get; set; } = string.Empty;
    public string ProjectDescription { get; set; } = string.Empty;
    public List<IFormFile>? Documents { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
}