using BookingMicroService.Models;

namespace BookingMicroService.Interfaces
{
    public interface IManagePassenger
    {
        public Task<Passenger?> AddPassenger(Passenger passenger);
        public Task<Passenger?> DeletePassenger(int id);
        public Task<Passenger?> GetPassenger(int id);
        public Task<List<Passenger>?> GetAllPassenger();
        public Task<Passenger?> UpdatePassenger(Passenger passenger);
    }
}
