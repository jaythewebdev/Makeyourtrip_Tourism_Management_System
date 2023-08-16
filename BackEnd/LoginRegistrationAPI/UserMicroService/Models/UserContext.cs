using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace UserMicroService.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User>? Users { get; set; }

        public DbSet<TravelAgent>? TravelAgents { get; set; }

        public DbSet<Traveller>? Travellers { get; set; }

        public DbSet<Admin>? Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Traveller>().Property(i => i.TravellerId).ValueGeneratedNever();
            modelBuilder.Entity<TravelAgent>().Property(i => i.AgentId).ValueGeneratedNever();
            modelBuilder.Entity<Admin>().Property(i => i.AdminId).ValueGeneratedNever();

            modelBuilder.Entity<User>()
           .HasIndex(u => u.EmailId)
           .IsUnique(true);

            // Unique constraint for Admin table
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.EmailId)
                .IsUnique(true);

            // Unique constraint for TourAgent table
            modelBuilder.Entity<TravelAgent>()
                .HasIndex(ta => ta.EmailId)
                .IsUnique(true);

            // Unique constraint for Traveller table
            modelBuilder.Entity<Traveller>()
                .HasIndex(t => t.EmailId)
                .IsUnique(true);
        }
    }
}
