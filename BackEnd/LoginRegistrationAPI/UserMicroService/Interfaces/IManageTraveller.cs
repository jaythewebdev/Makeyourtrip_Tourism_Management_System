using System.Numerics;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Interfaces
{
    public interface IManageTraveller
    {
        public Task<UserDTO?> TravellerRegistration(TravellerRegisterDTO traveller);
        public Task<Traveller?> TravellerProfile(string email);
        public Task<TravellerUpdateDTO?> UpdateTraveller(TravellerUpdateDTO traveller);
        public Task<ICollection<TravelAgent?>?> SearchAgentForTraveller(string name);
       
    }
}
