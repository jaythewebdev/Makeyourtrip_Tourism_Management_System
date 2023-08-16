using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO> Login(LoginDTO loginDTO);
        public Task<User> UpdatePassword(PasswordChangeDTO pass);

    }
}
