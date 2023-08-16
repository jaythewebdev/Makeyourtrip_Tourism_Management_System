using Feedback.Context;
using Feedback.Interfaces;
using Feedback.Models;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Repository
{
    public class FeedbackRepo : IFeedBackCRUD<int, TourFeedBack>
    {
        private FeedbackContext _context;

            public FeedbackRepo(FeedbackContext context)
        {
            _context = context;
          
        }
        public async Task<TourFeedBack?> Add(TourFeedBack item)
        {
            try
            {
                _context.TourFeedBacks.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while adding feedback.", ex);
            }
        }

        public async Task<TourFeedBack?> Delete(int key)
        {
            try
            {
                var feedback = await _context.TourFeedBacks.FindAsync(key);
                if (feedback != null)
                {
                    _context.TourFeedBacks.Remove(feedback);
                    await _context.SaveChangesAsync();
                }
                return feedback;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while deleting Category.", ex);
            }
        }

        public async Task<TourFeedBack?> Get(int key)
        {
            try
            {
                return await _context.TourFeedBacks.FindAsync(key);
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while getting Category.", ex);
            }
        }

        public async Task<ICollection<TourFeedBack>?> GetAll()
        {
            try
            {
                var feedback = await _context.TourFeedBacks.ToListAsync();
                if (feedback.Count > 0)
                    return feedback;
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while Getting feedbacks.", ex);

            }
        }


        public async Task<TourFeedBack?> Update(TourFeedBack item)
        {
            try
            {
                _context.TourFeedBacks.Update(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                throw new Exception("Error occurred while Updating feedbacks.", ex);

            }
            return null;
        }
    }
}
