using TourPackageMicroservice.Models;

namespace TourPackageMicroService.Interfaces
{
    public interface IManageExclusion
    {
        public Task<Exclusions?> AddExclusion(Exclusions exclusion);
        public Task<Exclusions?> DeleteExclusion(int id);
        public Task<Exclusions?> GetExclusion(int id);
        public Task<ICollection<Exclusions>?> GetAllExclusion();
        public Task<Exclusions?> UpdateExclusion(Exclusions exclusion);
    }
}
