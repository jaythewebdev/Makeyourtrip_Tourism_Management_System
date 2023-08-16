using BookingMicroService.Interfaces;
using BookingMicroService.Models;
using BookingMicroService.Models.DTO;

namespace BookingMicroService.Services
{
    public class ManagePaymentService : IManagePayment
    {
        private readonly IBaseCRUD<int, Payment> _paymentRepo;
        private readonly ILogger<ManagePassengerService> _logger;

        public ManagePaymentService(IBaseCRUD<int, Payment> paymentRepo, ILogger<ManagePassengerService> logger)
        {
            _paymentRepo = paymentRepo;
            _logger = logger;
        }
        public async Task<Payment?> AddPayment(Payment payment)
        {
            try
            {
                payment.PaymentStatus="Pending";
                await _paymentRepo.Add(payment);
                return payment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> DeletePayment(int id)
        {
            try
            {
                var payment = await GetPayment(id);
                if (payment != null)
                {
                    await _paymentRepo.Delete(payment);
                    return payment;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<List<Payment>?> GetAllPayment()
        {
            try
            {
                var payment = await _paymentRepo.GetAll();
                if (payment != null)
                {
                    return payment;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> GetPayment(int id)
        {
            try
            {
                var payment = await _paymentRepo.Get(id);
                if (payment != null)
                {
                    return payment;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> UpdatePaymentStatus(PaymentDTO payment)
        {
            try
            {
                var updatingPayment = await _paymentRepo.Get(payment.PaymentId);
                if (updatingPayment != null)
                {
                    updatingPayment.PaymentStatus = payment.PaymentStatus;
                    var updatePaymentStatus= await _paymentRepo.Update(updatingPayment);
                    return updatePaymentStatus;
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
