using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace MunicipalityBackend.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get system statistics
    /// </summary>
    [HttpGet("stats")]
    [SwaggerResponse(200, "System statistics")]
    public async Task<ActionResult<object>> GetStats()
    {
        var stats = new
        {
            TotalServiceRequests = await _context.ServiceRequests.CountAsync(),
            PendingServiceRequests = await _context.ServiceRequests.CountAsync(r => r.Status == "Pending"),
            TotalPotholeReports = await _context.PotholeReports.CountAsync(),
            TotalBuildingPermits = await _context.BuildingPermits.CountAsync(),
            RecentSubmissions = await _context.ServiceRequests
                .OrderByDescending(r => r.CreatedAt)
                .Take(5)
                .ToListAsync()
        };

        return Ok(stats);
    }

    /// <summary>
    /// Generate reports
    /// </summary>
    [HttpGet("reports")]
    [SwaggerResponse(200, "Report data")]
    public async Task<ActionResult> GenerateReport([FromQuery] AdminReportQueryDto query)
    {
        var serviceRequests = _context.ServiceRequests.AsQueryable();
        var potholeReports = _context.PotholeReports.AsQueryable();
        var buildingPermits = _context.BuildingPermits.AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(query.Status))
        {
            serviceRequests = serviceRequests.Where(r => r.Status == query.Status);
            potholeReports = potholeReports.Where(r => r.Status == query.Status);
            buildingPermits = buildingPermits.Where(r => r.Status == query.Status);
        }

        if (query.FromDate.HasValue)
        {
            serviceRequests = serviceRequests.Where(r => r.CreatedAt >= query.FromDate);
            potholeReports = potholeReports.Where(r => r.CreatedAt >= query.FromDate);
            buildingPermits = buildingPermits.Where(r => r.CreatedAt >= query.FromDate);
        }

        if (query.ToDate.HasValue)
        {
            serviceRequests = serviceRequests.Where(r => r.CreatedAt <= query.ToDate);
            potholeReports = potholeReports.Where(r => r.CreatedAt <= query.ToDate);
            buildingPermits = buildingPermits.Where(r => r.CreatedAt <= query.ToDate);
        }

        // Apply sorting
        var sortBy = query.SortBy?.ToLower() ?? "date";
        serviceRequests = sortBy switch
        {
            "status" => query.SortDescending ? serviceRequests.OrderByDescending(r => r.Status) : serviceRequests.OrderBy(r => r.Status),
            "type" => query.SortDescending ? serviceRequests.OrderByDescending(r => r.ServiceType) : serviceRequests.OrderBy(r => r.ServiceType),
            _ => query.SortDescending ? serviceRequests.OrderByDescending(r => r.CreatedAt) : serviceRequests.OrderBy(r => r.CreatedAt)
        };

        var result = new
        {
            ServiceRequests = await serviceRequests.ToListAsync(),
            PotholeReports = await potholeReports.ToListAsync(),
            BuildingPermits = await buildingPermits.ToListAsync()
        };

        return Ok(result);
    }
}