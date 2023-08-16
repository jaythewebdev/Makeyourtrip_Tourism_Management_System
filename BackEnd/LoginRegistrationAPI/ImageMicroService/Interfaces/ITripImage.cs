using ImageMicroService.Models;

namespace ImageMicroService.Interfaces
{
    public interface ITripImage 
    {
        public Task<TripImage?> AddTripImage(TripImage tripImage);
        public Task<TripImage?> DeleteTripImage(int tripImageId);
        public Task<TripImage?> GetTripImage(int tripImageId);
        public Task<ICollection<TripImage>?> GetAllTripImages();
        public Task<TripImage?> UpdateImage(TripImage tripImage);
    }
}
