﻿using Microsoft.EntityFrameworkCore;
using System.Security.AccessControl;
using UserMicroService.Interfaces;
using UserMicroService.Models;

namespace UserMicroService.Services
{
    public class UserRepo : IBaseCRUD<string, User>
    {
        private readonly UserContext _context;
        private readonly ILogger<UserRepo> _logger;

        public UserRepo(UserContext context, ILogger<UserRepo> logger)
        {
            _context = context;
            _logger = logger;

        }
        public async Task<User?> Add(User item)
        {
            try
            {
                _context.Users.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Delete(string key)
        {
            try
            {
                var user = await Get(key);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                    return user;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Get(string key)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailId == key);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<User>?> GetAll()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                if (users.Count > 0)
                    return users;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<User?> Update(User item)
        {
            try
            {
                var user = await Get(item.EmailId);
                if (user != null)
                {
                    user.Role = item.Role;
                    await _context.SaveChangesAsync();
                    return user;
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
