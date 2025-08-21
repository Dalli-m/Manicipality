namespace MunicipalityBackend.DTOs;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http; 

public class AdminReportQueryDto
{
    public string? Status { get; set; } 
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public string? SortBy { get; set; } 
    public bool SortDescending { get; set; } = true;
}
