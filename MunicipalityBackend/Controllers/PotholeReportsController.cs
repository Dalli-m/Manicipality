using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace MunicipalityBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PotholeReportsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<PotholeReportsController> _logger;

    public PotholeReportsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment,
        ILogger<PotholeReportsController> logger)
    {
        _context = context;
        _environment = environment;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PotholeReport>>> GetPotholeReports()
    {
        return await _context.PotholeReports
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PotholeReport>> GetPotholeReport(int id)
    {
        var report = await _context.PotholeReports.FindAsync(id);

        if (report == null)
        {
            return NotFound(new { message = "Pothole report not found" });
        }

        return report;
    }

    [HttpPost]
    public async Task<ActionResult<PotholeReport>> CreatePotholeReport(
        [FromForm] PotholeReportDto reportDto)
    {
       
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrEmpty(reportDto.Location))
        {
            return BadRequest(new { message = "Location is required" });
        }

        string imagePath = null;

      
        if (reportDto.ImageFile != null && reportDto.ImageFile.Length > 0)
        {
            
            
            if (reportDto.ImageFile.Length > 5 * 1024 * 1024)
            {
                return BadRequest(new { message = "Image file must be less than 5MB" });
            }

         
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(reportDto.ImageFile.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest(new { message = "Only image files (jpg, jpeg, png, gif) are allowed" });
            }

            try
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "potholes");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await reportDto.ImageFile.CopyToAsync(stream);
                }

                imagePath = $"/uploads/potholes/{uniqueFileName}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading pothole image");
                return StatusCode(500, new { message = "Error uploading image" });
            }
        }

        var report = new PotholeReport
        {
            Location = reportDto.Location,
            Description = reportDto.Description ?? string.Empty,
            ImagePath = imagePath,
            CreatedAt = DateTime.UtcNow,
            Status = "Pending"
        };

        _context.PotholeReports.Add(report);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPotholeReport), new { id = report.Id }, report);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto statusUpdate)
    {
        var report = await _context.PotholeReports.FindAsync(id);
        if (report == null)
        {
            return NotFound(new { message = "Pothole report not found" });
        }

        report.Status = statusUpdate.Status;
        report.UpdatedAt = DateTime.UtcNow;

        _context.PotholeReports.Update(report);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeletePotholeReport(int id)
    {
        var report = await _context.PotholeReports.FindAsync(id);
        if (report == null)
        {
            return NotFound(new { message = "Pothole report not found" });
        }

        
        if (!string.IsNullOrEmpty(report.ImagePath))
        {
            var imagePath = report.ImagePath.Replace("/", "\\").TrimStart('\\');
            var fullPath = Path.Combine(_environment.WebRootPath, imagePath);
            
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
        }

        _context.PotholeReports.Remove(report);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}


