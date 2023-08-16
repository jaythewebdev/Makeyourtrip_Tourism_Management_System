using BookingMicroService.Interfaces;
using BookingMicroService.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingMicroService.Services
{
    public class PaymentRepo : IBaseCRUD<int, Payment>
    {
        private BookingContext _context;
        private readonly ILogger<BookingRepo> _logger;

        public PaymentRepo(BookingContext context, ILogger<BookingRepo> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Payment?> Add(Payment item)
        {
            try
            {
                await _context.Payments.AddAsync(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> Delete(Payment item)
        {
            try
            {
                var payment = await Get(item.BookingId);
                if (payment != null)
                {
                    _context.Payments.Remove(payment);
                    await _context.SaveChangesAsync();
                    return payment;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> Get(int key)
        {
            try
            {
                return await _context.Payments.FirstOrDefaultAsync(u => u.PaymentId == key);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<List<Payment>?> GetAll()
        {
            try
            {
                return await _context.Payments.ToListAsync();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Payment?> Update(Payment item)
        {
            try
            {
                _context.Payments.Update(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
