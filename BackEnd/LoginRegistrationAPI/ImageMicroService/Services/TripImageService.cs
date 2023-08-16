using ImageMicroService.Interfaces;
using ImageMicroService.Models;

namespace ImageMicroService.Services
{
    public class TripImageService : ITripImage
    {
        private readonly IImageCRUD<int, TripImage> _tripImageRepository;

        public TripImageService(IImageCRUD<int, TripImage> tripImageRepository)
        {
            _tripImageRepository = tripImageRepository;
        }
        public Task<TripImage?> AddTripImage(TripImage tripImage)
        {
            return _tripImageRepository.Add(tripImage);
        }

        public Task<TripImage?> DeleteTripImage(int tripImageId)
        {
            return _tripImageRepository.Delete(tripImageId);
        }

        public Task<ICollection<TripImage>?> GetAllTripImages()
        {
            return _tripImageRepository.GetAll();
           
        }

        public Task<TripImage?> GetTripImage(int tripImageId)
        {
            return _tripImageRepository.Get(tripImageId);
        }

        public Task<TripImage?> UpdateImage(TripImage tripImage)
        {
            return _tripImageRepository.Update(tripImage);
        }
    }

}
