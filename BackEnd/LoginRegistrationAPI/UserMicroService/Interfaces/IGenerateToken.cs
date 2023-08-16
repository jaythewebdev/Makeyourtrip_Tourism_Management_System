using UserMicroService.Models.DTO;

namespace UserMicroService.Interfaces
{
    public interface IGenerateToken
    {
        public string GenerateToken(UserDTO user);

    }
}
