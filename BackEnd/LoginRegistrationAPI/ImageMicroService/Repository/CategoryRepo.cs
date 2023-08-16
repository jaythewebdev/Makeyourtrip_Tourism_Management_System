using ImageMicroService.Context;
using ImageMicroService.Interfaces;
using ImageMicroService.Models;
using Microsoft.EntityFrameworkCore;

namespace ImageMicroService.Repository
{
    public class CategoryRepo : IImageCRUD<int, Category>
    {
        private readonly ImageContext _context;

        public CategoryRepo(ImageContext context)
        {
            _context = context;
        }
        public async Task<Category?> Add(Category item)
        {
            try
            {
                _context.Categories.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while adding Category.", ex);
            }
        }

        public async Task<Category?> Delete(int key)
        {
            try
            {
                var category = await _context.Categories.FindAsync(key);
                if (category != null)
                {
                    _context.Categories.Remove(category);
                    await _context.SaveChangesAsync();
                }
                return category;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while deleting Category.", ex);
            }
        }

        public async Task<Category?> Get(int key)
        {
            try
            {
                return await _context.Categories.FindAsync(key);
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while getting Category.", ex);
            }
        }

        public async Task<ICollection<Category>?> GetAll()
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();
                if (categories.Count > 0)
                    return categories;
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while getting all Categories.", ex);
            }
        }

        public async Task<Category?> Update(Category item)
        {
            try
            {
                _context.Categories.Update(item);
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
