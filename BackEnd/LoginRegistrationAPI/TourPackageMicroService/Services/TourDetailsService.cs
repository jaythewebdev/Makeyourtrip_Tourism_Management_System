using Microsoft.Extensions.Logging;
using TourPackageMicroservice.Interfaces;
using TourPackageMicroservice.Models;
using TourPackageMicroService.Interfaces;
using TourPackageMicroService.Models.DTO;

namespace TourPackageMicroService.Services
{
    public class TourDetailsService : IManageTourDetails
    {
        private readonly IRepo<TourDetails,int> _tourDetailsRepo;
        private readonly ILogger<TourDetailsService> _logger;


        public TourDetailsService(IRepo<TourDetails, int> tourDetailsRepo, ILogger<TourDetailsService> logger) {
            _tourDetailsRepo = tourDetailsRepo;
            _logger = logger;

        }
        public async Task<TourDetails?> AddtourDetails(TourDetails tourDetails)
        {
            try
            {
                tourDetails.Availability = "Opened";
                await _tourDetailsRepo.Add(tourDetails);
                return tourDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<TourDetails?> DeletetourDetails(int id)
        {
            try
            {
                var booking = await GettourDetails(id);
                if (booking != null)
                {
                    await _tourDetailsRepo.Delete(id);
                    return booking;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<TourDetails>?> GetAlltourDetails()
        {
            try
            {
                var bookings = await _tourDetailsRepo.GetAll();
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

        public async Task<TourDetails?> GettourDetails(int id)
        {
            try
            {
                var booking = await _tourDetailsRepo.Get(id);
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

        public async Task<TourDetails?> UpdateBookingCount(BookedCapacityDTO bookedCapacityDTO)
        {
            try
            {
                var tourdetails = await _tourDetailsRepo.Get(bookedCapacityDTO.TourId);
                if (tourdetails != null)
                {
                    tourdetails.BookedCapacity = bookedCapacityDTO.BookedCapacity;
                    
                    await _tourDetailsRepo.Update(tourdetails);
                    return tourdetails;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;     
        }

        public async Task<TourDetails?> UpdatetourDetails(TourDetails tours)
        {
            try
            {
                var tourdetails = await _tourDetailsRepo.Get(tours.TourId);
                if (tourdetails != null)
                {
                    tourdetails.TourName = string.IsNullOrEmpty(tours.TourName) ? tourdetails.TourName : tours.TourName;

                    tourdetails.TourDescription = string.IsNullOrEmpty(tours.TourDescription) ? tourdetails.TourDescription : tours.TourDescription;
                    tourdetails.Tourtype = string.IsNullOrEmpty(tours.Tourtype) ? tourdetails.Tourtype : tours.Tourtype;
                    // Assuming tourdetails and tours are objects of some class containing DepartureDate and ReturnDate properties

                    if (tours.DepartureDate != null && tours.DepartureDate != DateTime.MinValue)
                    {
                        tourdetails.DepartureDate = tours.DepartureDate;
                    }
                    else if (tourdetails.DepartureDate == null || tourdetails.DepartureDate == DateTime.MinValue)
                    {
                        // Keep the existing value in tourdetails or set it to a default value
                        tourdetails.DepartureDate = tourdetails.DepartureDate; // You can choose an appropriate default value
                    }

                    if (tours.ReturnDate != null && tours.ReturnDate != DateTime.MinValue)
                    {
                        tourdetails.ReturnDate = tours.ReturnDate;
                    }
                    else if (tourdetails.ReturnDate == null || tourdetails.ReturnDate == DateTime.MinValue)
                    {
                        // Keep the existing value in tourdetails or set it to a default value
                        tourdetails.ReturnDate = tourdetails.ReturnDate; // You can choose an appropriate default value
                    }

                    tourdetails.Availability = string.IsNullOrEmpty(tours.Availability) ? tourdetails.Availability : tours.Availability;

                    tourdetails.TourPrice = tours.TourPrice == 0 ? tourdetails.TourPrice : tours.TourPrice;
                    tourdetails.MaxCapacity = tours.MaxCapacity == 0 ? tourdetails.MaxCapacity : tours.MaxCapacity;
                    tourdetails.BookedCapacity = tours.BookedCapacity == 0 ? tourdetails.BookedCapacity : tours.BookedCapacity;
                    tourdetails.ImageUrl = string.IsNullOrEmpty(tours.ImageUrl) ? tourdetails.ImageUrl : tours.ImageUrl;
                    tourdetails.CancellationPolicy = string.IsNullOrEmpty(tours.CancellationPolicy) ? tourdetails.CancellationPolicy : tours.CancellationPolicy;
                    tourdetails.AccomodationStatus = string.IsNullOrEmpty(tours.AccomodationStatus) ? tourdetails.AccomodationStatus : tours.AccomodationStatus;
                    tourdetails.BookingRestriction = tours.BookingRestriction==0 ? tourdetails.BookingRestriction : tours.BookingRestriction;
                    tourdetails.HealthAndSafety = string.IsNullOrEmpty(tours.HealthAndSafety) ? tourdetails.HealthAndSafety : tours.HealthAndSafety;
    

                    await _tourDetailsRepo.Update(tourdetails);
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
