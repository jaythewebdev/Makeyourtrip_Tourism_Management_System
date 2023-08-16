namespace BookingMicroService.Interfaces
{
    public interface IBaseCRUD<K, T>
    {
        public Task<T?> Get(K key);
        public Task<List<T>?> GetAll();
        public Task<T?> Add(T item);
        public Task<T?> Update(T item);
        public Task<T?> Delete(T item);
    }
}
