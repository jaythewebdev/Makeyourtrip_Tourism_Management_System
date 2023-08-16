using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Cryptography;
using System.Text;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Services
{
    public class ManageTravelAgentService : IManageTravelAgent
    {
        private readonly IBaseCRUD<string, User> _userRepo;
        private readonly IBaseCRUD<string, TravelAgent> _agentRepo;
        private readonly IBaseCRUD<string, Admin> _adminRepo;
        private readonly IBaseCRUD<string, Traveller> _travellerRepo;
        private readonly IGenerateToken _generateToken;

        public ManageTravelAgentService(IBaseCRUD<string, User> userRepo, IBaseCRUD<string, TravelAgent> agentRepo, IBaseCRUD<string, Admin> adminRepo, IBaseCRUD<string, Traveller> travellerRepo, IGenerateToken generateToken)
        {
            _userRepo = userRepo;
            _agentRepo = agentRepo;
            _adminRepo = adminRepo;
            _travellerRepo = travellerRepo;
            _generateToken = generateToken;
        }
        public async Task<TravelAgent?> AgentProfile(string email)
        {
            var users = await _agentRepo.Get(email);
            if (users != null)
            {
                return users;
            }
            return null;
        }

        public async Task<UserDTO?> AgentRegistration(TravelAgentRegisterDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear));
            user.User.PasswordKey = hmac.Key;
            user.User.EmailId = user.EmailId;
            user.User.Role = "TravelAgent";
            user.Status = "UnApproved";
            var admin = await _agentRepo.GetAll();
            if (admin != null)
            {
                var myAdmin = admin.FirstOrDefault(u => u.EmailId == user.EmailId && u.PhoneNumber == user.PhoneNumber);
                if (myAdmin != null)
                {
                    return null;
                }
            }

                var userResult = await _userRepo.Add(user.User);
            var adminResult = await _agentRepo.Add(user);
            if (userResult != null && adminResult != null)
            {
                myUser = new UserDTO();
                myUser.Id = userResult.UserId;
                myUser.EmailId = adminResult.EmailId;
                myUser.Role = userResult.Role;
                myUser.Status = "UnApproved";
                myUser.Token = _generateToken.GenerateToken(myUser);
            }
            return myUser;
        }

        public async Task<string?> GetAgentCity(string email)
        {
            var users = await _agentRepo.Get(email);
            if (users != null)
            {
                return users.City;
            }
            return null;
        }

        public async Task<UpdateDTO?> UpdateTravelAgent(UpdateDTO user)
        {
            var userData = await _agentRepo.Get(user.EmailId);
            if (userData != null)
            {
                userData.Status = user.Status;
                userData.PhoneNumber = user.PhoneNumber;
                userData.AgencyName = user.AgencyName;
                userData.Street = user.Street;
                userData.City = user.City;
                userData.State = user.State;
                userData.Country = user.Country;

                var result = await _agentRepo.Update(userData);
                if (result != null)
                {
                    return user;
                }
            }
            return null;
        }
    }
}
