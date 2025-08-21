using Microsoft.AspNetCore.Mvc;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;

namespace MunicipalityBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BuildingPermitsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public BuildingPermitsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }


    [HttpPost]
    public async Task<ActionResult<BuildingPermit>> CreateBuildingPermit(
        [FromForm] BuildingPermitDto permitDto)
    {
        var documentPaths = new List<string>();

        if (permitDto.Documents != null && permitDto.Documents.Count > 0)
        {
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "permits");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            foreach (var file in permitDto.Documents)
            {
                if (file.Length > 0)
                {
                    var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    documentPaths.Add($"/uploads/permits/{uniqueFileName}");
                }
            }
        }

        var permit = new BuildingPermit
        {
            PermitType = permitDto.PermitType,
            Address = permitDto.Address,
            ProjectDescription = permitDto.ProjectDescription,
            DocumentPaths = documentPaths,
            ContactEmail = permitDto.ContactEmail,
            CreatedAt = DateTime.UtcNow,
            Status = "Pending"
        };

        _context.BuildingPermits.Add(permit);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBuildingPermit), 
            new { id = permit.Id }, permit);
    }

    private object GetBuildingPermit()
    {
        throw new NotImplementedException();
    }
}