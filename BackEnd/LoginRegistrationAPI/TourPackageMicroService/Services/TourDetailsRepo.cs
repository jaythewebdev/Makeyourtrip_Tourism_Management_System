using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TourPackageMicroservice.Models.Context;
using TourPackageMicroservice.Interfaces;
using Microsoft.Extensions.Logging;

namespace TourPackageMicroservice.Models
{
    public class TourDetailsRepo : IRepo<TourDetails,int>
    {
        private readonly TourContext _context;

        private readonly ILogger<TourDetailsRepo> _logger;


        public TourDetailsRepo(TourContext context, ILogger<TourDetailsRepo> logger)
        {
            _context = context;
            _logger = logger;

        }

        public async Task<TourDetails?> Add(TourDetails item)
        {
            var transaction = _context.Database.BeginTransaction();

            try
            {
                _context.TourDetails.Add(item);
                await _context.SaveChangesAsync();
                transaction.Commit();

                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                transaction.Rollback();
            }
            return null;
        }

        public async Task<TourDetails?> Delete(int key)
        {
            var transaction = _context.Database.BeginTransaction();

            TourDetails tour = await Get(key);
            if (tour != null)
            {
                try
                {
                    _context.Remove(tour);
                    await _context.SaveChangesAsync();
                    transaction.Commit();


                    return tour;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    transaction.Rollback();
                }
            }

            return null;
        }


        public async Task<ICollection<TourDetails?>?> GetAll()
        {
            try
            {
                List<TourDetails> tour = await _context.TourDetails.Include(c => c.TourExclusion).Include(c => c.TourInclusion).Include(c => c.PickupPoints).Include(c => c.TourDestination).ThenInclude(c => c.Destination).Include(c => c.Itineraries).ThenInclude(c => c.DailySchedules).ToListAsync();
                return tour;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

            }
            return null;
        }




        public async Task<TourDetails?> Get(int key)
        {
            try
            {
                var tour = await _context.TourDetails.Include(c => c.TourExclusion).Include(c => c.TourInclusion).Include(c=>c.PickupPoints).Include(c => c.TourDestination).ThenInclude(c => c.Destination).Include(c => c.Itineraries).ThenInclude(c => c.DailySchedules).FirstOrDefaultAsync(u => u.TourId == key);
                return tour;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

            }
            return null;
        }


        public async Task<TourDetails> Update(TourDetails updatedtourDetails)
        {

            var tourdetails =await  Get(updatedtourDetails.TourId);
            if (tourdetails != null)
            {
                tourdetails.TourDescription= updatedtourDetails.TourDescription;
                tourdetails.Tourtype = updatedtourDetails.Tourtype;
                tourdetails.DepartureDate = updatedtourDetails.DepartureDate;
                tourdetails.ReturnDate = updatedtourDetails.ReturnDate;
                tourdetails.TourPrice = updatedtourDetails.TourPrice;
                tourdetails.MaxCapacity = updatedtourDetails.MaxCapacity;
                tourdetails.BookedCapacity = updatedtourDetails.BookedCapacity;
                if(updatedtourDetails.MaxCapacity<=updatedtourDetails.BookedCapacity)
                {
                    tourdetails.Availability = "Closed";
                }
                else
                {
                    tourdetails.Availability = "Opened";
                }
                tourdetails.ImageUrl = updatedtourDetails.ImageUrl;
                tourdetails.CancellationPolicy = updatedtourDetails.CancellationPolicy;
                tourdetails.AccomodationStatus=updatedtourDetails.AccomodationStatus;
                tourdetails.BookingRestriction = updatedtourDetails.BookingRestriction;
                tourdetails.HealthAndSafety = updatedtourDetails.HealthAndSafety;

            }

            await _context.SaveChangesAsync();
            return tourdetails;
        }

 
    }
}
