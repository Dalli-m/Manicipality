namespace MunicipalityBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<ServiceRequest> ServiceRequests { get; set; }
    public DbSet<PotholeReport> PotholeReports { get; set; }
    public DbSet<BuildingPermit> BuildingPermits { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<PropertyTaxPayment> PropertyTaxPayments { get; set; }
    public IEnumerable<object> ServiceRequestNotes { get; internal set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
    }
}