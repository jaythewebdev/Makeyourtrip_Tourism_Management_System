using ImageMicroService.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace ImageMicroService.Context
{
    public class ImageContext : DbContext
    {
        public ImageContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<TripImage> TripImages { get; set; }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
        }
    }
}
