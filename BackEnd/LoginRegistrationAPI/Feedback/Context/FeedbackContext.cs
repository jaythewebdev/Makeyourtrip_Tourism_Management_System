using Feedback.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Context
{
    public class FeedbackContext : DbContext
    {

        public FeedbackContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<TourFeedBack> TourFeedBacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
