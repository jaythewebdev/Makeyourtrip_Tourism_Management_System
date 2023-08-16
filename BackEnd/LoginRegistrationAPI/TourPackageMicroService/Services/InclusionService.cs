using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Models;
using TourPackageMicroService.Interfaces;

namespace TourPackageMicroService.Services
{
    public class InclusionService : IManageInclusion
    {
        private readonly IRepo<Inclusions, int> _inclusionsRepo;
        private readonly ILogger<InclusionService> _logger;


        public InclusionService(IRepo<Inclusions, int> inclusionRepo, ILogger<InclusionService> logger)
        {
            _inclusionsRepo = inclusionRepo;
            _logger = logger;

        }
        public async Task<Inclusions?> AddInclusion(Inclusions Inclusions)
        {
            try
            {
                await _inclusionsRepo.Add(Inclusions);
                return Inclusions;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Inclusions?> DeleteInclusion(int id)
        {
            try
            {
                var booking = await GetInclusion(id);
                if (booking != null)
                {
                    await _inclusionsRepo.Delete(id);
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Inclusions>?> GetAllInclusion()
        {
            try
            {
                var bookings = await _inclusionsRepo.GetAll();
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

        public async Task<Inclusions?> GetInclusion(int id)
        {
            try
            {
                var booking = await _inclusionsRepo.Get(id);
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

        public async Task<Inclusions?> UpdateInclusion(Inclusions Inclusions)
        {
            try
            {
                var tourdetails = await _inclusionsRepo.Get(Inclusions.InclusionId);
                if (tourdetails != null)
                {
                    tourdetails.InclusionDescription = string.IsNullOrEmpty(Inclusions.InclusionDescription) ? tourdetails.InclusionDescription : Inclusions.InclusionDescription;
                    await _inclusionsRepo.Update(tourdetails);
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

