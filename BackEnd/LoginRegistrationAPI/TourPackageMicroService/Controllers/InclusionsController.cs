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
    public class InclusionsController : ControllerBase
    {
        private readonly IManageInclusion _inclusionsRepository;

        public InclusionsController(IManageInclusion inclusionsRepository)
        {
            _inclusionsRepository = inclusionsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<Inclusions>>> GetAllInclusions()
        {
            try
            {
                var inclusions = await _inclusionsRepository.GetAllInclusion();
                return Ok(inclusions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving inclusions.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Inclusions>> GetInclusionById(int id)
        {
            try
            {
                var inclusion = await _inclusionsRepository.GetInclusion(id);
                if (inclusion == null)
                {
                    return NotFound();
                }

                return Ok(inclusion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while retrieving inclusion.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Inclusions>> AddInclusion(Inclusions inclusion)
        {
            try
            {
                var addedInclusion = await _inclusionsRepository.AddInclusion(inclusion);
                if (addedInclusion != null)
                {
                    return Ok(addedInclusion);
                }
                return BadRequest("Cannot add inclusion now");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while adding inclusion.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Inclusions>> UpdateInclusion(Inclusions inclusion)
        {
            try
            {
                

                var existingInclusion = await _inclusionsRepository.GetInclusion(inclusion.InclusionId);
                if (existingInclusion == null)
                {
                    return NotFound();
                }

                var updatedInclusion = await _inclusionsRepository.UpdateInclusion(inclusion);
                return Ok(updatedInclusion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while updating inclusion.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "TravelAgent")]

        public async Task<ActionResult<Inclusions>> DeleteInclusion(int id)
        {
            try
            {
                var result = await _inclusionsRepository.DeleteInclusion(id);
                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error while deleting inclusion.");
            }
        }
    }
}
