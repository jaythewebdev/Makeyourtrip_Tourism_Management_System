using Microsoft.EntityFrameworkCore;
using System.Numerics;
using UserMicroService.Interfaces;
using UserMicroService.Models;

namespace UserMicroService.Services
{
    public class AgentRepo : IBaseCRUD<string, TravelAgent>
    {
        private readonly UserContext _context;
        private readonly ILogger<User> _logger;

        public AgentRepo(UserContext context, ILogger<User> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<TravelAgent?> Add(TravelAgent item)
        {
            try
            {
                _context.TravelAgents.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<TravelAgent?> Delete(string key)
        {
            try
            {
                var agent = await Get(key);
                if (agent != null)
                {
                    _context.TravelAgents.Remove(agent);
                    await _context.SaveChangesAsync();
                    return agent;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<TravelAgent?> Get(string key)
        {
            try
            {
                var agent = await _context.TravelAgents.Include(i => i.User).FirstOrDefaultAsync(i => i.EmailId == key);
                return agent;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<TravelAgent>?> GetAll()
        {
            try
            {
                var agent = await _context.TravelAgents.Include(i => i.User).ToListAsync();
                if (agent.Count > 0)
                    return agent;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<TravelAgent?> Update(TravelAgent item)
        {
            try
            {
                var agent = _context.TravelAgents.FirstOrDefault(u => u.EmailId == item.EmailId); ;
                if (agent != null)
                {
                    agent.Status = item.Status != null ? item.Status : agent.Status;
                    agent.PhoneNumber = item.PhoneNumber != null ? item.PhoneNumber : agent.PhoneNumber;
                    agent.AgencyName = item.AgencyName != null ? item.AgencyName : agent.AgencyName;
                    agent.Street = item.Street != null ? item.Street : agent.Street;
                    agent.City = item.City != null ? item.City : agent.City;
                    agent.State = item.State != null ? item.State : agent.State;
                    agent.Country = item.Country != null ? item.Country : agent.Country;

                    await _context.SaveChangesAsync();
                    return agent;
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
