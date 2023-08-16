namespace TourPackageMicroService.Interfaces
{
    public interface IManageDestination
    {
        public Task<Destination?> AddDestination(Destination destination);
        public Task<Destination?> DeleteDestination(int id);
        public Task<Destination?> GetDestination(int id);
        public Task<ICollection<Destination>?> GetAllDestination();
        public Task<Destination?> UpdateDestination(Destination destination);
    }
}
