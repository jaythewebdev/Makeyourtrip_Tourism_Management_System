using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Cryptography;
using System.Text;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Services
{
    public class ManageTravellersService : IManageTraveller
    {
        private readonly IBaseCRUD<string, User> _userRepo;
        private readonly IBaseCRUD<string, TravelAgent> _agentRepo;
        private readonly IBaseCRUD<string, Admin> _adminRepo;
        private readonly IBaseCRUD<string, Traveller> _travellerRepo;
        private readonly IGenerateToken _generateToken;

        public ManageTravellersService(IBaseCRUD<string, User> userRepo, IBaseCRUD<string, TravelAgent> agentRepo, IBaseCRUD<string, Admin> adminRepo, IBaseCRUD<string, Traveller> travellerRepo, IGenerateToken generateToken)
        {
            _userRepo = userRepo;
            _agentRepo = agentRepo;
            _adminRepo = adminRepo;
            _travellerRepo = travellerRepo;
            _generateToken = generateToken;
        }
        public async Task<ICollection<TravelAgent?>?> SearchAgentForTraveller(string name)
        {
            var users = await _agentRepo.GetAll();
            if (users != null)
            {
                var doctors = users.Where(i => i.AgencyName.ToUpper().Contains(name.ToUpper()) && i.Status == "Approved").ToList();
                if (doctors.Count > 0)
                {
                    return doctors;
                }
            }
            return null;
        }

        public async Task<Traveller?> TravellerProfile(string email)
        {
            var users = await _travellerRepo.Get(email);
            if (users != null)
            {
                return users;
            }
            return null;
        }

        public async Task<UserDTO?> TravellerRegistration(TravellerRegisterDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.User.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear ?? "1234"));
            user.User.PasswordKey = hmac.Key;

            user.User.Role = "Traveller";
            user.User.EmailId = user.EmailId;


            var users = await _userRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.EmailId == user.EmailId);
                if (myAdminUser != null)
                {
                    return null;
                }
                else
                {
                    var admin = await _travellerRepo.GetAll();
                    if (admin != null)
                    {
                        var myAdmin = admin.FirstOrDefault(u => u.EmailId == user.EmailId && u.PhoneNumber == user.PhoneNumber);
                        if (myAdmin != null)
                        {
                            return null;
                        }
                    }
                }
            }
            var userResult = await _userRepo.Add(user.User);
            var adminResult = await _travellerRepo.Add(user);
            if (userResult != null && adminResult != null)
            {
                myUser = new UserDTO();
                myUser.Id = userResult.UserId;
                myUser.EmailId = adminResult.EmailId;
                myUser.Role = userResult.Role;
                myUser.Status = null;
                myUser.Token = _generateToken.GenerateToken(myUser);
            }
            return myUser;
        }

        public async Task<TravellerUpdateDTO?> UpdateTraveller(TravellerUpdateDTO user)
        {
            var userData = await _travellerRepo.Get(user.EmailId);
            if (userData != null)
            {
                userData.PhoneNumber = user.PhoneNumber;
                var result = await _travellerRepo.Update(userData);
                if (result != null)
                {
                    return user;
                }
            }
            return null;
        }
    }
}
