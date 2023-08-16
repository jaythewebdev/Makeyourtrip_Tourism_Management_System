using Feedback.Interfaces;
using Feedback.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Feedback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class FeedbackController : ControllerBase
    {
        private readonly IFeed _feed;

        public FeedbackController(IFeed feed)
        {
            _feed = feed;
        }

        [HttpPost]
        [ProducesResponseType(typeof(TourFeedBack), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<TourFeedBack>> AddFeedback([FromBody] TourFeedBack category)
        {
            var addedCategory = await _feed.AddFeedback(category);
            if (addedCategory != null)
            {
                return Created("Home", addedCategory);
            }
            return BadRequest("Unable to add category at this moment");
        }

        [HttpGet]
        [ProducesResponseType(typeof(TourFeedBack), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<ICollection<TourFeedBack>>> GetAllFeedback()
        {
            var categories = await _feed.GetAllFeedback();
            if (categories != null)
            {
                return Ok(categories);
            }
            return NotFound();
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(TourFeedBack), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<TourFeedBack>> GetFeedback(int id)
        {
            var category = await _feed.GetFeedback(id);
            if (category != null)
            {
                return Ok(category);
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(TourFeedBack), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<TourFeedBack>> DeleteFeedback(int id)
        {
            var deletedCategory = await _feed.DeleteFeedback(id);
            if (deletedCategory != null)
            {
                return Ok(deletedCategory);
            }
            return NotFound();
        }

        [HttpPut]
        [ProducesResponseType(typeof(ActionResult<TourFeedBack>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<TourFeedBack>> UpdateFeedback(TourFeedBack feedBack)
        {
            var UpdateFeedback = await _feed.UpdateFeedback(feedBack);
            if (UpdateFeedback != null)
            {
                return Ok(UpdateFeedback);
            }
            return BadRequest("Unable to update booking details");
        }

    }
}
