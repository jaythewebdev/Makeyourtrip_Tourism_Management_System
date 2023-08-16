using BookingMicroService.Models;
using BookingMicroService.Models.DTO;

namespace BookingMicroService.Interfaces
{
    public interface IManagePayment
    {
        public Task<Payment?> AddPayment(Payment payment);
        public Task<Payment?> DeletePayment(int id);
        public Task<Payment?> GetPayment(int id);
        public Task<List<Payment>?> GetAllPayment();
        public Task<Payment?> UpdatePaymentStatus(PaymentDTO payment);
    }
}
