namespace MunicipalityBackend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class PotholeReportDto
{
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public IFormFile? ImageFile { get; set; }
}