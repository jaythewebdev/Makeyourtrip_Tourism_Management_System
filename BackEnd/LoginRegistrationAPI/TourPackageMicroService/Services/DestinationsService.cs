using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Models;
using TourPackageMicroService.Interfaces;

namespace TourPackageMicroService.Services
{
    public class DestinationsService : IManageDestination
    {
        private readonly IRepo<Destination, int> _destinationRepo;
        private readonly ILogger<DestinationsService> _logger;


        public DestinationsService(IRepo<Destination, int> destinationRepo, ILogger<DestinationsService> logger)
        {
            _destinationRepo = destinationRepo;
            _logger = logger;

        }
        public async Task<Destination?> AddDestination(Destination destination)
        {
            try
            {
                await _destinationRepo.Add(destination);
                return destination;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Destination?> DeleteDestination(int id)
        {
            try
            {
                var booking = await GetDestination(id);
                if (booking != null)
                {
                    await _destinationRepo.Delete(id);
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Destination>?> GetAllDestination()
        {
            try
            {
                var bookings = await _destinationRepo.GetAll();
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

        public async Task<Destination?> GetDestination(int id)
        {
            try
            {
                var booking = await _destinationRepo.Get(id);
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

        public async Task<Destination?> UpdateDestination(Destination destination)
        {
            try
            {
                var tourdetails = await _destinationRepo.Get(destination.DestinationId);
                if (tourdetails != null)
                {
                    tourdetails.DestinationCityName = string.IsNullOrEmpty(destination.DestinationCityName) ? tourdetails.DestinationCityName : destination.DestinationCityName;
                    tourdetails.Country = string.IsNullOrEmpty(destination.Country) ? tourdetails.Country : destination.Country;

                    await _destinationRepo.Update(tourdetails);
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
