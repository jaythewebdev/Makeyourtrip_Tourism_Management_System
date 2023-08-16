using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Models;
using TourPackageMicroService.Interfaces;

namespace TourPackageMicroService.Services
{
    public class ExclusionService : IManageExclusion
    {
        private readonly IRepo<Exclusions, int> _exclusionsRepo;
        private readonly ILogger<ExclusionService> _logger;


        public ExclusionService(IRepo<Exclusions, int> exclusionRepo, ILogger<ExclusionService> logger)
        {
            _exclusionsRepo = exclusionRepo;
            _logger = logger;

        }
        public async Task<Exclusions?> AddExclusion(Exclusions exclusions)
        {
            try
            {
                await _exclusionsRepo.Add(exclusions);
                return exclusions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Exclusions?> DeleteExclusion(int id)
        {
            try
            {
                var booking = await GetExclusion(id);
                if (booking != null)
                {
                    await _exclusionsRepo.Delete(id);
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Exclusions>?> GetAllExclusion()
        {
            try
            {
                var bookings = await _exclusionsRepo.GetAll();
                if (bookings != null)
                {
                    return bookings;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Exclusions?> GetExclusion(int id)
        {
            try
            {
                var booking = await _exclusionsRepo.Get(id);
                if (booking != null)
                {
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Exclusions?> UpdateExclusion(Exclusions exclusions)
        {
            try
            {
                var tourdetails = await _exclusionsRepo.Get(exclusions.ExclusionId);
                if (tourdetails != null)
                {
                    tourdetails.ExclusionDescription = string.IsNullOrEmpty(exclusions.ExclusionDescription) ? tourdetails.ExclusionDescription : exclusions.ExclusionDescription;
                    await _exclusionsRepo.Update(tourdetails);
                    return tourdetails;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
