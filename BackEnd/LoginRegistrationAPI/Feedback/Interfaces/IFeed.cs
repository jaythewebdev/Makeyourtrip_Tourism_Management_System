using Feedback.Models;

namespace Feedback.Interfaces
{
    public interface IFeed
    {
        public Task<TourFeedBack?> AddFeedback(TourFeedBack tourFeedBack);
        public Task<TourFeedBack?> DeleteFeedback(int tourId);
        public Task<TourFeedBack?> GetFeedback(int tourId);
        public Task<ICollection<TourFeedBack>?> GetAllFeedback();
        public Task<TourFeedBack?> UpdateFeedback(TourFeedBack tourFeedBack);



    }
}
