using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using TourPackageMicroservice.Models;
using TourPackageMicroService.Interfaces;

namespace TourPackageMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourDetailsController : ControllerBase
    {
        private readonly IManageTourDetails _tourDetailsRepository;

        public TourDetailsController(IManageTourDetails tourDetailsRepository)
        {
            _tourDetailsRepository = tourDetailsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<TourDetails>>> GetAllTourDetails()
        {
            try
            {
                var tourDetails = await _tourDetailsRepository.GetAlltourDetails();
                return Ok(tourDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving tour details.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TourDetails>> GetTourDetailsById(int id)
        {
            try
            {
                var tourDetails = await _tourDetailsRepository.GettourDetails(id);
                if (tourDetails == null)
                {
                    return NotFound();
                }

                return Ok(tourDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving tour details.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<TourDetails>> AddTourDetails(TourDetails tourDetails)
        {
            try
            {
                var addedTourDetails = await _tourDetailsRepository.AddtourDetails(tourDetails);
                if (addedTourDetails != null)
                {
                    return Ok(addedTourDetails);
                }
                return BadRequest("Cannot add tourdetails now");         
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while adding tour details.");
            }
        }

        [HttpPut]
        //[Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<TourDetails>> UpdateTourDetails(TourDetails tourDetails)
        {
            try
            {
               

                var existingTourDetails = await _tourDetailsRepository.GettourDetails(tourDetails.TourId);
                if (existingTourDetails == null)
                {
                    return NotFound();
                }

                var updatedTourDetails = await _tourDetailsRepository.UpdatetourDetails(tourDetails);
                return Ok(updatedTourDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while updating tour details.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<TourDetails>> DeleteTourDetails(int id)
        {
            try
            {
                var result = await _tourDetailsRepository.DeletetourDetails(id);
                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while deleting tour details.");
            }
        }
    }
}
