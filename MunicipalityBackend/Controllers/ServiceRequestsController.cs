using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MunicipalityBackend.DTOs;
using MunicipalityBackend.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace MunicipalityBackend.Controllers;


[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
[Authorize]
public class ServiceRequestsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ServiceRequestsController> _logger;

    public ServiceRequestsController(
        ApplicationDbContext context,
        ILogger<ServiceRequestsController> logger)
    {
        _context = context;
        _logger = logger;
    }


    [HttpGet]
    [SwaggerResponse(200, "List of service requests", typeof(IEnumerable<ServiceRequest>))]
    [SwaggerResponse(401, "Unauthorized access")]
    public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetServiceRequests()
    {
        if (User.IsInRole("Admin") || User.IsInRole("Staff"))
        {
            return await _context.ServiceRequests
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
        else
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _context.ServiceRequests
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
    }

  
    [HttpGet("{id}")]
    [SwaggerResponse(200, "Service request found", typeof(ServiceRequest))]
    [SwaggerResponse(404, "Service request not found")]
    public async Task<ActionResult<ServiceRequest>> GetServiceRequest(int id)
    {
        var serviceRequest = await _context.ServiceRequests.FindAsync(id);

        if (serviceRequest == null)
        {
            return NotFound();
        }

     
        if (User.IsInRole("Citizen") && serviceRequest.UserId != User.FindFirst(ClaimTypes.NameIdentifier)?.Value)
        {
            return Forbid();
        }

        return serviceRequest;
    }

 
    [HttpPost]
//[Authorize(Roles = "Citizen")]
public async Task<ActionResult<ServiceRequest>> CreateServiceRequest(
    [FromBody] ServiceRequestDto requestDto)
{
    _logger.LogInformation("CreateServiceRequest called");
    _logger.LogInformation($"Request data: {JsonSerializer.Serialize(requestDto)}");

    
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    _logger.LogInformation($"User ID from token: {userId}");

    if (string.IsNullOrEmpty(userId))
    {
        _logger.LogWarning("User ID is null or empty - authentication issue");
        return Unauthorized(new { message = "User not authenticated" });
    }

    if (!ModelState.IsValid)
    {
        _logger.LogWarning("Model state invalid");
        return BadRequest(ModelState);
    }

    try
    {
        var serviceRequest = new ServiceRequest
        {
            ServiceType = requestDto.ServiceType,
            Location = requestDto.Location,
            Description = requestDto.Description,
            ContactInfo = requestDto.ContactInfo,
            Urgency = requestDto.Urgency,
            CreatedAt = DateTime.UtcNow,
            Status = "Pending",
            UserId = userId
        };

        _logger.LogInformation("Adding service request to context");
        _context.ServiceRequests.Add(serviceRequest);

        _logger.LogInformation("Saving changes to database");
        var result = await _context.SaveChangesAsync();
        _logger.LogInformation($"Save changes result: {result} rows affected");

        _logger.LogInformation($"Service request created with ID: {serviceRequest.Id}");

        return CreatedAtAction(nameof(GetServiceRequest), 
            new { id = serviceRequest.Id }, 
            serviceRequest);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating service request");
        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
    }
}


    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin,Staff")]
    [SwaggerResponse(204, "Status updated successfully")]
    [SwaggerResponse(404, "Service request not found")]
    public async Task<IActionResult> UpdateStatus(
        int id, 
        [FromBody] StatusUpdateDto statusUpdate)
    {
        var request = await _context.ServiceRequests.FindAsync(id);
        if (request == null)
        {
            return NotFound();
        }

        request.Status = statusUpdate.Status;
        request.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();

        return NoContent();
    }


    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    [SwaggerResponse(204, "Service request deleted")]
    [SwaggerResponse(404, "Service request not found")]
    public async Task<IActionResult> DeleteServiceRequest(int id)
    {
        var serviceRequest = await _context.ServiceRequests.FindAsync(id);
        if (serviceRequest == null)
        {
            return NotFound();
        }

        _context.ServiceRequests.Remove(serviceRequest);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}


public class StatusUpdateDto
{
 
    public string Status { get; set; } = string.Empty;
    
    
    public string? Notes { get; set; }
}