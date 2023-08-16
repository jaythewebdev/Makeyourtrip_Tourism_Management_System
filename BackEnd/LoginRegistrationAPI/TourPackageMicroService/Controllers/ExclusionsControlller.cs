using Microsoft.AspNetCore.Mvc;
using TourPackageMicroservice.Models;
using TourPackageMicroservice.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TourPackageMicroservice.Exceptions;
using System;
using TourPackageMicroService.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace TourPackageMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExclusionsController : ControllerBase
    {
        private readonly IManageExclusion _exclusionsRepository;

        public ExclusionsController(IManageExclusion exclusionsRepository)
        {
            _exclusionsRepository = exclusionsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<Exclusions>>> GetAllExclusions()
        {
            try
            {
                var exclusions = await _exclusionsRepository.GetAllExclusion();
                return Ok(exclusions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving exclusions.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Exclusions>> GetExclusionById(int id)
        {
            try
            {
                var exclusion = await _exclusionsRepository.GetExclusion(id);
                if (exclusion == null)
                {
                    return NotFound();
                }

                return Ok(exclusion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving exclusion.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Exclusions>> AddExclusion(Exclusions exclusion)
        {
            try
            {
                var addedExclusion = await _exclusionsRepository.AddExclusion(exclusion);
                if (addedExclusion != null)
                {
                    return Ok(addedExclusion);
                }
                return BadRequest("Cannot add exclusion now");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while adding exclusion.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Exclusions>> UpdateExclusion(Exclusions tourExclusion)
        {
            try
            {
              

                var existingExclusion = await _exclusionsRepository.GetExclusion(tourExclusion.ExclusionId);
                if (existingExclusion == null)
                {
                    return NotFound();
                }

                var updatedExclusion = await _exclusionsRepository.UpdateExclusion(tourExclusion);
                return Ok(updatedExclusion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while updating exclusion.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Exclusions>> DeleteExclusion(int id)
        {
            try
            {
                var result = await _exclusionsRepository.DeleteExclusion(id);
                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while deleting exclusion.");
            }
        }
    }
}
