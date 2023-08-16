using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Services
{
    public class ManageAdminService : IManageAdmin
    {
        private readonly IBaseCRUD<string, User> _userRepo;
        private readonly IBaseCRUD<string, TravelAgent> _agentRepo;
        private readonly IBaseCRUD<string, Admin> _adminRepo;
        private readonly IBaseCRUD<string, Traveller> _travellerRepo;
        private readonly IGenerateToken _generateToken;

        public ManageAdminService(IBaseCRUD<string, User> userRepo, IBaseCRUD<string, TravelAgent> agentRepo, IBaseCRUD<string, Admin> adminRepo, IBaseCRUD<string, Traveller> travellerRepo, IGenerateToken generateToken)
        {
            _userRepo = userRepo;
            _agentRepo = agentRepo;
            _adminRepo = adminRepo;
            _travellerRepo = travellerRepo;
            _generateToken = generateToken;
        }

        public async Task<UserDTO?> AdminRegistration(AdminRegisterDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear));
            user.User.PasswordKey = hmac.Key;

            user.User.Role = "Admin";
            user.User.EmailId = user.EmailId;

            var admin = await _adminRepo.GetAll();
            if (admin != null)
            {
                var myAdmin = admin.FirstOrDefault(u => u.EmailId == user.EmailId && u.PhoneNumber == user.PhoneNumber);
                if (myAdmin != null)
                {
                    return null;
                }
            }

                var userResult = await _userRepo.Add(user.User);
                var adminResult = await _adminRepo.Add(user);
                if (userResult != null && adminResult != null)
                {
                    myUser = new UserDTO();
                    myUser.Id = userResult.UserId;
                    myUser.EmailId = userResult.EmailId;
                    myUser.Role = userResult.Role;
                    myUser.Status = null;
                    myUser.Token = _generateToken.GenerateToken(myUser);
                }
                return myUser;
        }

        public async Task<StatusDTO?> ChangeTravelAgentStatus(StatusDTO userApproval)
        {
            var userData = await _agentRepo.Get(userApproval.EmailId);
            if (userData != null)
            {
                userData.Status = userApproval.Status;
                var result = await _agentRepo.Update(userData);
                if (result != null)
                {
                    return userApproval;
                }
            }
            return null;
        }

        public async Task<TravelAgent?> DeleteTravelAgent(string email)
        {
            var userData = await _agentRepo.Delete(email);
            if (userData != null)
            {
                return userData;
            }
            return null;
        }

        public async Task<Admin?> GetAdminProfile(string email)
        {
            var userData = await _adminRepo.Get(email);
            if (userData != null)
            {
                return userData;
            }
            return null;
        }

        public async Task<ICollection<TravelAgent?>?> ViewAllAgents()
        {
            var userData = await _agentRepo.GetAll();
            if (userData != null)
            {
                return userData;
            }
            return null;
        }

        public async Task<ICollection<TravelAgent?>?> ViewAllApprovedAgents()
        {
            var userData = await _agentRepo.GetAll();
            if (userData != null)
            {
                var myUsers = userData.Where(u => u.Status == "Approved").OrderByDescending(u => u.EmailId).ToList();
                if (myUsers.Count > 0)
                {
                    return myUsers;
                }
            }
            return null;
        }

        public async Task<ICollection<Traveller?>?> ViewAllTravellers()
        {
            var userData = await _travellerRepo.GetAll();
            if (userData != null)
            {
                return userData;
            }
            return null;
        }

        public async Task<ICollection<TravelAgent?>?> ViewAllUnapprovedAgents()
        {
            var userData = await _agentRepo.GetAll();
            if (userData != null)
            {
                var myUsers = userData.Where(u => u.Status == "UnApproved").OrderByDescending(u => u.EmailId).ToList();
                if (myUsers.Count > 0)
                {
                    return myUsers;
                }
            }
            return null;
        }
    }
}
