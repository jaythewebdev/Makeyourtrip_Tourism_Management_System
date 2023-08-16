using Microsoft.EntityFrameworkCore;
using UserMicroService.Interfaces;
using UserMicroService.Models;

namespace UserMicroService.Services
{
    public class AdminRepo:IBaseCRUD<string,Admin>
    {
        private readonly UserContext _context;
        private readonly ILogger<UserRepo> _logger;

        public AdminRepo(UserContext Context, ILogger<UserRepo> logger)
        {
            _context = Context;
            _logger = logger;
        }


        public async Task<Admin?> Add(Admin item)
        {
            try
            {
                _context.Admins.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public Task<Admin?> Delete(string key)
        {
            throw new NotImplementedException();
        }

        public async Task<Admin?> Get(string key)
        {
            try
            {
                var user = await _context.Admins.FirstOrDefaultAsync(u => u.EmailId == key);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Admin>?> GetAll()
        {
            try
            {
                var users = await _context.Admins.ToListAsync();
                if (users.Count > 0)
                    return users;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public Task<Admin?> Update(Admin item)
        {
            throw new NotImplementedException();
        }
    }
}
