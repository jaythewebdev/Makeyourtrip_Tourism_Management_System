using BookingMicroService.Models;
using BookingMicroService.Models.DTO;

namespace BookingMicroService.Interfaces
{
    public interface IManageBooking
    {
        public Task<Booking?> AddBooking(Booking booking);
        public Task<Booking?> DeleteBooking(int id);
        public Task<Booking?> GetBooking(int id);
        public Task<List<Booking>?> GetAllBooking();
        public Task<Booking?> UpdateBooking(Booking booking);
        public Task<Booking?> UpdateBookingStatus(BookingDTO bookingDTO);
    }
}
