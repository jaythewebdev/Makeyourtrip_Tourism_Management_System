using TourPackageMicroservice.Models;
using TourPackageMicroService.Models.DTO;

namespace TourPackageMicroService.Interfaces
{
    public interface IManageTourDetails
    {
        public Task<TourDetails?> AddtourDetails(TourDetails tourDetails);
        public Task<TourDetails?> DeletetourDetails(int id);
        public Task<TourDetails?> GettourDetails(int id);
        public Task<ICollection<TourDetails>?> GetAlltourDetails();
        public Task<TourDetails?> UpdatetourDetails(TourDetails tourDetails);
        public Task<TourDetails?> UpdateBookingCount(BookedCapacityDTO bookedCapacityDTO);
    }
}
