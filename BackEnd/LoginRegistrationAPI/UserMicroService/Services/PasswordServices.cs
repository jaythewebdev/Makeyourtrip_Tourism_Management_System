using Microsoft.Data.SqlClient;
using UserMicroService.CustomExceptions;
using UserMicroService.Interfaces;
using UserMicroService.Models;

namespace UserMicroService.Services
{
    public class PasswordServices : IChangePassword
    {
        private readonly UserContext _context;

        public PasswordServices(UserContext context)
        {
            _context = context;
        }

        public async Task<User> ChangePassword(byte[] PasswordHash, byte[] PasswordKey, User user, string NewPassword)
        {
            var users =await Get(user.EmailId);
            if (users != null)
            {
                users.Role = user.Role;
                users.PasswordHash = PasswordHash;
                users.PasswordKey = PasswordKey;
                _context.SaveChanges();
                return users;
            }
            return null;
        }

        public Task<User?> Add(User item)
        {
            throw new NotImplementedException();
        }

        public Task<User?> Delete(string key)
        {
            throw new NotImplementedException();
        }

        public async Task<User?> Get(string key)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.EmailId == key);
                if (user != null)
                {
                    return user;
                }
                return null;
            }
            catch (NullReferenceException nre)
            {
                throw new InvalidNullReferenceException(nre.Message);
            }
            catch (ArgumentNullException ane)
            {
                throw new InvalidArgumentNullException(ane.Message);
            }
            catch (SqlException se)
            {
                throw new InvalidSqlException(se.Message);
            }
        }

        public Task<ICollection<User>?> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<User?> Update(User item)
        {
            throw new NotImplementedException();
        }
    }
}
