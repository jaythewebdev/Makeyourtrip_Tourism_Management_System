using BookingMicroService.Models;
using BookingMicroService.Models.DTO;
using BookingMicroService.Services;
using ImageMicroService.Context;
using ImageMicroService.Interfaces;
using ImageMicroService.Models;
using ImageMicroService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace Testing
{
    [TestClass]
    public class CategoryServiceTests
    {
            [TestMethod]
            public async Task AddCategory_ShouldReturnAddedCategory()
            {
                // Arrange
                var options = new DbContextOptionsBuilder<ImageContext>()
                    .UseInMemoryDatabase(databaseName: "AddCategory_Database")
                    .Options;

                using (var context = new ImageContext(options))
                {
                    var mockRepository = new Mock<IImageCRUD<int, Category>>();
                    var categoryService = new CategoryService(mockRepository.Object);

                    var newCategory = new Category { CategoryId = 1, Name = "Test Category" };

                    mockRepository.Setup(repo => repo.Add(It.IsAny<Category>()))
                        .ReturnsAsync(newCategory);

                    // Act
                    var result = await categoryService.AddCategory(newCategory);

                    // Assert
                    Assert.IsNotNull(result);
                    Assert.AreEqual(newCategory.CategoryId, result.CategoryId);
                }
            }

        [TestMethod]
        public async Task DeleteCategory_ShouldReturnDeletedCategory()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "DeleteCategory_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, Category>>();
                var categoryService = new CategoryService(mockRepository.Object);

                var categoryId = 1;
                var categoryToDelete = new Category { CategoryId = categoryId, Name = "Test Category" };

                mockRepository.Setup(repo => repo.Delete(It.IsAny<int>()))
                    .ReturnsAsync(categoryToDelete);

                // Act
                var result = await categoryService.DeleteCategory(categoryId);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(categoryId, result.CategoryId);
            }
        }

        [TestMethod]
        public async Task GetCategory_ShouldReturnCategoryById()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "GetCategory_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, Category>>();
                var categoryService = new CategoryService(mockRepository.Object);

                var categoryId = 1;
                var categoryToReturn = new Category { CategoryId = categoryId, Name = "Test Category" };

                mockRepository.Setup(repo => repo.Get(It.IsAny<int>()))
                    .ReturnsAsync(categoryToReturn);

                // Act
                var result = await categoryService.GetCategory(categoryId);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(categoryId, result.CategoryId);
            }
        }

        [TestMethod]
        public async Task GetAllCategories_ShouldReturnListOfCategories()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "GetAllCategories_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, Category>>();
                var categoryService = new CategoryService(mockRepository.Object);

                var categories = new List<Category>
                {
                    new Category { CategoryId = 1, Name = "Category 1" },
                    new Category { CategoryId = 2, Name = "Category 2" }
                };

                mockRepository.Setup(repo => repo.GetAll())
                    .ReturnsAsync(categories);

                // Act
                var result = await categoryService.GetAllCategories();

                // Assert
                Assert.IsNotNull(result);
                CollectionAssert.AreEqual(categories, result.ToList());
            }
        }
        [TestMethod]
        public async Task UpdateCategory_ShouldReturnUpdatedCategory()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "UpdateCategory_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, Category>>();
                var categoryService = new CategoryService(mockRepository.Object);

                var categoryId = 1;
                var updatedCategory = new Category { CategoryId = categoryId, Name = "Updated Category" };

                mockRepository.Setup(repo => repo.Update(It.IsAny<Category>()))
                    .ReturnsAsync(updatedCategory);

                // Act
                var result = await categoryService.UpdateCategory(updatedCategory);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(updatedCategory.CategoryId, result.CategoryId);
                Assert.AreEqual(updatedCategory.Name, result.Name);
            }
        }
    }
}