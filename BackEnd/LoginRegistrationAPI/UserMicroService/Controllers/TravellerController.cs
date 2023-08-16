using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using UserMicroService.CustomExceptions;
using UserMicroService.Interfaces;
using UserMicroService.Models.DTO;
using UserMicroService.Models;

namespace UserMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class TravellerController : ControllerBase
    {
        private readonly IManageTraveller _traveller;
        public TravellerController(IManageTraveller traveller)
        {
            _traveller = traveller;
        }

        [HttpPost("Traveller_Registration")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        
        public async Task<ActionResult<UserDTO>> RegisterTraveller(TravellerRegisterDTO userDTO)
        {
            try
            {
                var user = await _traveller.TravellerRegistration(userDTO);
                if (user == null)
                {
                    return BadRequest(new Error(1, "Unable to Register. Try again with a different mail."));
                }
                return Ok(user);
            }
            catch (InvalidArgumentNullException iane)
            {
                return BadRequest(new Error(2, iane.Message));
            }
            catch (InvalidNullReferenceException inre)
            {
                return BadRequest(new Error(3, inre.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("Traveller_Profile")]
        [ProducesResponseType(typeof(Traveller), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Traveller")]
        public async Task<ActionResult<Traveller>> TravellerProfile(string key)
        {
            try
            {
                var user = await _traveller.TravellerProfile(key);
                if (user == null)
                {
                    return BadRequest(new Error(1, "Unable to get the profile."));
                }
                return Ok(user);
            }
            catch (InvalidArgumentNullException iane)
            {
                return BadRequest(new Error(2, iane.Message));
            }
            catch (InvalidNullReferenceException inre)
            {
                return BadRequest(new Error(3, inre.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update_Traveller_Profile")]
        [ProducesResponseType(typeof(Traveller), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Traveller")]
        public async Task<ActionResult<TravellerUpdateDTO>> UpdateTravellerProfile(TravellerUpdateDTO Traveller)
        {
            try
            {
                var user = await _traveller.UpdateTraveller(Traveller);
                if (user == null)
                {
                    return BadRequest(new Error(1, "Unable to update the profile."));
                }
                return Ok(user);
            }
            catch (InvalidArgumentNullException iane)
            {
                return BadRequest(new Error(2, iane.Message));
            }
            catch (InvalidNullReferenceException inre)
            {
                return BadRequest(new Error(3, inre.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("Search_Agent_for_Traveller")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<TravelAgent>>> SearchByNameForTraveller(string name)
        {
            try
            {
                var user = await _traveller.SearchAgentForTraveller(name);
                if (user == null)
                {
                    return BadRequest(new Error(1, "No doctors available ."));
                }
                return Ok(user);
            }
            catch (InvalidArgumentNullException iane)
            {
                return BadRequest(new Error(2, iane.Message));
            }
            catch (InvalidNullReferenceException inre)
            {
                return BadRequest(new Error(3, inre.Message));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
