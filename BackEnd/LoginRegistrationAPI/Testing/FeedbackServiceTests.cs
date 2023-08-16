using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feedback.Context;
using Feedback.Interfaces;
using Feedback.Models;
using Feedback.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace FeedbackTest
{
    [TestClass]
    public class FeedBackServicesTests
    {
        private DbContextOptions<FeedbackContext> GetInMemoryDatabaseOptions(string databaseName)
        {
            return new DbContextOptionsBuilder<FeedbackContext>()
                .UseInMemoryDatabase(databaseName)
                .Options;
        }

        private async Task<TourFeedBack> AddFeedbackToDatabase(FeedbackContext context, TourFeedBack feedback)
        {
            context.TourFeedBacks.Add(feedback);
            await context.SaveChangesAsync();
            return feedback;
        }

        [TestMethod]
        public async Task AddFeedback_ShouldReturnAddedFeedback()
        {
            // Arrange
            var mockRepository = new Mock<IFeedBackCRUD<int, TourFeedBack>>();
            var feedbackServices = new FeedBackServices(mockRepository.Object);

            var newFeedback = new TourFeedBack
            {
                TravellerName = "John Doe",
                TouristSpotName = "Example Spot",
                Email = "johndoe@example.com",
                FeedbackText = "Great experience!",
                Rating = 5,
                DateSubmitted = DateTime.UtcNow
            };

            mockRepository.Setup(repo => repo.Add(It.IsAny<TourFeedBack>()))
                .ReturnsAsync(newFeedback);

            // Act
            var addedFeedback = await feedbackServices.AddFeedback(newFeedback);

            // Assert
            Assert.IsNotNull(addedFeedback);
            Assert.AreEqual(newFeedback.TravellerName, addedFeedback.TravellerName);
        }

        [TestMethod]
        public async Task UpdateFeedback_ShouldReturnUpdatedFeedback()
        {
            // Arrange
            var mockRepository = new Mock<IFeedBackCRUD<int, TourFeedBack>>();
            var feedbackServices = new FeedBackServices(mockRepository.Object);

            var feedbackId = 1; // Replace with the desired feedback id
            var updatedFeedback = new TourFeedBack
            {
                FeedbackId = feedbackId,
                TravellerName = "Updated Traveller",
                Email = "johndoe@example.com",
                FeedbackText = "Great experience!",
                Rating = 5,
                DateSubmitted = DateTime.UtcNow
                // ... (other properties)
            };

            mockRepository.Setup(repo => repo.Get(It.IsAny<int>()))
                .ReturnsAsync(updatedFeedback);

            mockRepository.Setup(repo => repo.Update(It.IsAny<TourFeedBack>()))
                .ReturnsAsync(updatedFeedback);

            // Act
            var result = await feedbackServices.UpdateFeedback(updatedFeedback);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(updatedFeedback.TravellerName, result.TravellerName);
        }

        [TestMethod]
        public async Task GetFeedback_ShouldReturnFeedbackById()
        {
            // Arrange
            var mockRepository = new Mock<IFeedBackCRUD<int, TourFeedBack>>();
            var feedbackServices = new FeedBackServices(mockRepository.Object);

            var feedbackId = 1; // Replace with the desired feedback id
            var expectedFeedback = new TourFeedBack
            {
                FeedbackId = feedbackId,
                TravellerName = "John Doe",
                Email = "johndoe@example.com",
                FeedbackText = "Great experience!",
                Rating = 5,
                DateSubmitted = DateTime.UtcNow
                // ... (other properties)
            };

            mockRepository.Setup(repo => repo.Get(It.IsAny<int>()))
                .ReturnsAsync(expectedFeedback);

            // Act
            var result = await feedbackServices.GetFeedback(feedbackId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(expectedFeedback.FeedbackId, result.FeedbackId);
            Assert.AreEqual(expectedFeedback.TravellerName, result.TravellerName);
            // Additional assertions if needed
        }

        [TestMethod]
        public async Task GetAllFeedback_ShouldReturnAllFeedback()
        {
            // Arrange
            var mockRepository = new Mock<IFeedBackCRUD<int, TourFeedBack>>();
            var feedbackServices = new FeedBackServices(mockRepository.Object);

            var feedbackList = new List<TourFeedBack>
            {
                new TourFeedBack { FeedbackId = 1, TravellerName = "John Doe" },
                new TourFeedBack { FeedbackId = 2, TravellerName = "Jane Doe" }
                // ... (add more feedback items if needed)
            };

            mockRepository.Setup(repo => repo.GetAll())
                .ReturnsAsync(feedbackList);

            // Act
            var result = await feedbackServices.GetAllFeedback();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(feedbackList.Count, result.Count);
            // Additional assertions if needed
        }

        [TestMethod]
        public async Task DeleteFeedback_ShouldReturnDeletedFeedback()
        {
            // Arrange
            var mockRepository = new Mock<IFeedBackCRUD<int, TourFeedBack>>();
            var feedbackServices = new FeedBackServices(mockRepository.Object);

            var feedbackId = 1; // Replace with the desired feedback id
            var feedbackToDelete = new TourFeedBack
            {
                FeedbackId = feedbackId,
                TravellerName = "John Doe",
                Email = "johndoe@example.com",
                FeedbackText = "Great experience!",
                Rating = 5,
                DateSubmitted = DateTime.UtcNow
                // ... (other properties)
            };

            mockRepository.Setup(repo => repo.Get(It.IsAny<int>()))
                .ReturnsAsync(feedbackToDelete);

            mockRepository.Setup(repo => repo.Delete(It.IsAny<int>()))
                .ReturnsAsync(feedbackToDelete);

            // Act
            var result = await feedbackServices.DeleteFeedback(feedbackId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(feedbackToDelete.FeedbackId, result.FeedbackId);
            // Additional assertions if needed
        }


    }
}

