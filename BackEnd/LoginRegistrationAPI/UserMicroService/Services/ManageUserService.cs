using System.Security.Cryptography;
using System.Text;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Services
{
    public class ManageUserService : IManageUser
    {
        private readonly IBaseCRUD<string, User> _userRepo;
        private readonly IBaseCRUD<string, TravelAgent> _agentRepo;

        private readonly IGenerateToken _generateToken;
        private readonly IChangePassword _changePassword;

        public ManageUserService(IBaseCRUD<string, User> userRepo,IGenerateToken generateToken, IBaseCRUD<string, TravelAgent> agentRepo,IChangePassword changePassword)
        { 
            _userRepo = userRepo;
            _generateToken = generateToken;
            _changePassword = changePassword;
            _agentRepo = agentRepo;
        }
        public async Task<UserDTO> Login(LoginDTO loginDTO)
        {
            UserDTO user = null;
            var userData =await _userRepo.Get(loginDTO.EmailId);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                var status = await _agentRepo.Get(loginDTO.EmailId);
                user = new UserDTO();
                user.Id = userData.UserId;
                user.EmailId = userData.EmailId;
                user.Role = userData.Role;
                user.Status = userData.Role == "TravelAgent" ? status.Status : null;
                user.Token = (userData.Role == "TravelAgent" && status.Status == "Approved") || (userData.Role == "Traveller") || (userData.Role == "Admin") ?
                    _generateToken.GenerateToken(user) : null;
            }
            return user;
        }

        public async Task<User> UpdatePassword(PasswordChangeDTO pass)
        {
            var userData = await _userRepo.Get(pass.email);

            if (string.IsNullOrEmpty(pass.NewPassword) || string.IsNullOrEmpty(pass.ConfirmNewPassword))
            {
                return null; // Either the new password or confirm new password is empty
            }

            if (pass.NewPassword.Equals(pass.ConfirmNewPassword))
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                byte[] passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(pass.NewPassword));
                byte[] passwordKey = hmac.Key;
                User user =await _changePassword.ChangePassword(passwordHash, passwordKey, userData, pass.NewPassword);
                if (user != null)
                {
                    return user;
                }
            }

            return null;
        }
    }
}
