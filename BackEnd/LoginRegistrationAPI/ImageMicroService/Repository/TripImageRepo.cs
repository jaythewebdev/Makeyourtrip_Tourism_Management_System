using ImageMicroService.Context;
using ImageMicroService.Interfaces;
using ImageMicroService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ImageMicroService.Repository
{
    public class TripImageRepo : IImageCRUD<int, TripImage>
    {
        private readonly ImageContext _context;

        public TripImageRepo(ImageContext context)
        {
            _context = context;
        }

        public async Task<TripImage?> Add(TripImage item)
        {
            try
            {
                _context.TripImages.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while adding TripImage.", ex);
            }
        }

        public  async Task<TripImage?> Delete(int key)
        {
            try
            {
                var tripImage = await _context.TripImages.FindAsync(key);
                if (tripImage != null)
                {
                    _context.TripImages.Remove(tripImage);
                    await _context.SaveChangesAsync();
                }
                return tripImage;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while deleting TripImage.", ex);
            }
        }

        public  async Task<TripImage?> Get(int key)
        {
            try
            {
                var tripImages = await _context.TripImages.FindAsync(key);
                return tripImages;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while getting TripImage.", ex);
            }
        }

        public  async Task<ICollection<TripImage>?> GetAll()
        {
            try
            {
                var tripImages = await _context.TripImages.ToListAsync();
                if (tripImages.Count > 0)
                    return tripImages;
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while getting all TripImages.", ex);
            }
        }

        public async Task<TripImage?> Update(TripImage item)
        {
            try
            {
                _context.TripImages.Update(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while updating TripImages.", ex);
            }
        }
    }
}
