using Microsoft.EntityFrameworkCore;
using TourPackageMicroService.Models;

namespace TourPackageMicroservice.Models.Context
{
    public class TourContext : DbContext
    {



        public TourContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<TourDetails> TourDetails { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<TourDestination> TourDestinations { get; set; }
        public DbSet<TourInclusion> TourInclusions { get; set; }
        public DbSet<TourExclusion> TourExclusions { get; set; }
        public DbSet<Exclusions> Exclusions { get; set; }
        public DbSet<Inclusions> Inclusions { get; set; }
        public DbSet<PickupPoint> PickupPoints { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }

        public DbSet<DailySchedule> DailySchedules { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Exclusions>()
           .HasIndex(u => u.ExclusionDescription)
           .IsUnique(true);

            modelBuilder.Entity<Inclusions>()
                .HasIndex(a => a.InclusionDescription)
                .IsUnique(true);

            modelBuilder.Entity<Destination>()
                .HasIndex(ta => ta.DestinationCityName)
                .IsUnique(true);
        }
    }
}
