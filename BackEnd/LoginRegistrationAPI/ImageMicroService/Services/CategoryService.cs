using ImageMicroService.Interfaces;
using ImageMicroService.Models;

namespace ImageMicroService.Services
{
    public class CategoryService : ICategory
    {
        private readonly IImageCRUD<int, Category> _categoryRepository;
        public CategoryService(IImageCRUD<int,Category> categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public Task<Category?> AddCategory(Category category)
        {
            return _categoryRepository.Add(category);
        }

        public Task<Category?> DeleteCategory(int categoryId)
        {
            return _categoryRepository.Delete(categoryId);
        }

        public Task<Category?> GetCategory(int categoryId)
        {
            return _categoryRepository.Get(categoryId);
        }

        public Task<ICollection<Category>?> GetAllCategories()
        {
            return _categoryRepository.GetAll();
        }

        public Task<Category?> UpdateCategory(Category category)
        {
            return _categoryRepository.Update(category);
        }
    }
}
