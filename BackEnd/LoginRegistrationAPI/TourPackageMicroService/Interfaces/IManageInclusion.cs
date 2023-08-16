using TourPackageMicroservice.Models;

namespace TourPackageMicroService.Interfaces
{
    public interface IManageInclusion
    {
        public Task<Inclusions?> AddInclusion(Inclusions inclusion);
        public Task<Inclusions?> DeleteInclusion(int id);
        public Task<Inclusions?> GetInclusion(int id);
        public Task<ICollection<Inclusions>?> GetAllInclusion();
        public Task<Inclusions?> UpdateInclusion(Inclusions inclusion);
    }
}
