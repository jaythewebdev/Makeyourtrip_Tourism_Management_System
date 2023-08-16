using Feedback.Interfaces;
using Feedback.Models;

namespace Feedback.Services
{
    public class FeedBackServices : IFeed
    {
        private readonly IFeedBackCRUD<int, TourFeedBack> _feedBackCRUD;

        public FeedBackServices(IFeedBackCRUD<int, TourFeedBack> feedBackCRUD)
        {
            _feedBackCRUD = feedBackCRUD;
        }
        public Task<TourFeedBack?> AddFeedback(TourFeedBack tourFeedBack)
        {
            return _feedBackCRUD.Add(tourFeedBack);
        }

        public Task<TourFeedBack?> DeleteFeedback(int tourId)
        {
            return _feedBackCRUD.Delete(tourId);
        }

        public Task<ICollection<TourFeedBack>?> GetAllFeedback()
        {
            return _feedBackCRUD.GetAll();
        }

        public Task<TourFeedBack?> GetFeedback(int tourId)
        {
            return _feedBackCRUD.Get(tourId);
        }

        public Task<TourFeedBack?> UpdateFeedback(TourFeedBack tourFeedBack)
        {
            return _feedBackCRUD.Update(tourFeedBack);
        }
    }
}
