using Microsoft.EntityFrameworkCore;
using UserMicroService.Interfaces;
using UserMicroService.Models;

namespace UserMicroService.Services
{
    public class TravellerRepo:IBaseCRUD<string,Traveller>
    {
        private readonly UserContext _context;
        private readonly ILogger<User> _logger;

        public TravellerRepo(UserContext context, ILogger<User> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Traveller?> Add(Traveller item)
        {
            try
            {
                _context.Travellers.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveller?> Delete(string key)
        {
            try
            {
                var traveller = await Get(key);
                if (traveller != null)
                {
                    _context.Travellers.Remove(traveller);
                    await _context.SaveChangesAsync();
                    return traveller;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveller?> Get(string key)
        {
            try
            {
                var traveller = await _context.Travellers.Include(i => i.User).FirstOrDefaultAsync(i => i.EmailId == key);
                return traveller;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Traveller>?> GetAll()
        {
            try
            {
                var traveller = await _context.Travellers.Include(i => i.User).ToListAsync();
                if (traveller.Count > 0)
                    return traveller;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Traveller?> Update(Traveller item)
        {
            try
            {
                var traveller = _context.Travellers.FirstOrDefault(u => u.EmailId == item.EmailId); ;
                if (traveller != null)
                {
                    traveller.PhoneNumber = item.PhoneNumber != null ? item.PhoneNumber : traveller.PhoneNumber;
                    await _context.SaveChangesAsync();
                    return item;
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
