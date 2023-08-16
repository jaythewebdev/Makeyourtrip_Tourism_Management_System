using ImageMicroService.Context;
using ImageMicroService.Interfaces;
using ImageMicroService.Models;
using ImageMicroService.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testing
{
    [TestClass]
    public class TripImageServiceTests
    {
        [TestMethod]
        public async Task AddTripImage_ShouldReturnAddedTripImage()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "AddTripImage_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, TripImage>>();
                var tripImageService = new TripImageService(mockRepository.Object);

                var newTripImage = new TripImage { ImageId = 1, ImageUrl = "image.jpg" };

                mockRepository.Setup(repo => repo.Add(It.IsAny<TripImage>()))
                    .ReturnsAsync(newTripImage);

                // Act
                var result = await tripImageService.AddTripImage(newTripImage);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(newTripImage.ImageId, result.ImageId);
                Assert.AreEqual(newTripImage.ImageUrl, result.ImageUrl);
            }
        }

        [TestMethod]
        public async Task DeleteTripImage_ShouldReturnDeletedTripImage()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "DeleteTripImage_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, TripImage>>();
                var tripImageService = new TripImageService(mockRepository.Object);

                var tripImageId = 1;
                var tripImageToDelete = new TripImage { ImageId = tripImageId, ImageUrl = "image.jpg" };

                mockRepository.Setup(repo => repo.Delete(It.IsAny<int>()))
                    .ReturnsAsync(tripImageToDelete);

                // Act
                var result = await tripImageService.DeleteTripImage(tripImageId);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(tripImageId, result.ImageId);
                Assert.AreEqual(tripImageToDelete.ImageUrl, result.ImageUrl);
            }
        }
        [TestMethod]
        public async Task GetAllTripImages_ShouldReturnListOfTripImages()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "GetAllTripImages_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, TripImage>>();
                var tripImageService = new TripImageService(mockRepository.Object);

                var tripImages = new List<TripImage>
                {
                    new TripImage { ImageId = 1, ImageUrl = "image1.jpg" },
                    new TripImage { ImageId = 2, ImageUrl = "image2.jpg" }
                };

                mockRepository.Setup(repo => repo.GetAll())
                    .ReturnsAsync(tripImages);

                // Act
                var result = await tripImageService.GetAllTripImages();

                // Assert
                Assert.IsNotNull(result);
                CollectionAssert.AreEqual(tripImages, result.ToList());
            }
        }
        [TestMethod]
        public async Task UpdateImage_ShouldReturnUpdatedTripImage()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ImageContext>()
                .UseInMemoryDatabase(databaseName: "UpdateImage_Database")
                .Options;

            using (var context = new ImageContext(options))
            {
                var mockRepository = new Mock<IImageCRUD<int, TripImage>>();
                var tripImageService = new TripImageService(mockRepository.Object);

                var tripImageId = 1;
                var updatedTripImage = new TripImage { ImageId = tripImageId, ImageUrl = "updated.jpg" };

                mockRepository.Setup(repo => repo.Update(It.IsAny<TripImage>()))
                    .ReturnsAsync(updatedTripImage);

                // Act
                var result = await tripImageService.UpdateImage(updatedTripImage);

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(tripImageId, result.ImageId);
                Assert.AreEqual(updatedTripImage.ImageUrl, result.ImageUrl);
            }
        }
    }
}
