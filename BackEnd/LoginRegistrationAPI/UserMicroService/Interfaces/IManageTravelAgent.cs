using System.Numerics;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Interfaces
{
    public interface IManageTravelAgent
    {
        public Task<UserDTO?> AgentRegistration(TravelAgentRegisterDTO user);
        public Task<TravelAgent?> AgentProfile(string email);
        public Task<UpdateDTO?> UpdateTravelAgent(UpdateDTO agent);
        public Task<string?> GetAgentCity(string email);
    }
}
