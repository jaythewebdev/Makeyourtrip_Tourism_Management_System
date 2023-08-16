using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using UserMicroService.CustomExceptions;
using UserMicroService.Models.DTO;
using UserMicroService.Models;
using UserMicroService.Interfaces;

namespace UserMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class TravelAgentController : ControllerBase
    {
        private readonly IManageTravelAgent _agent;

        public TravelAgentController(IManageTravelAgent agent)
        {
            _agent = agent;
        }

        [HttpPost("agent_Registration")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserDTO>> Registeragent(TravelAgentRegisterDTO userDTO)
        {
            try
            {
                var user = await _agent.AgentRegistration(userDTO);
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

        [HttpGet("Agent_Profile")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "TravelAgent")]
        public async Task<ActionResult<TravelAgent>> AgentProfile(string key)
        {
            try
            {
                var user = await _agent.AgentProfile(key);
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

        [HttpPut("Update_Agent_Profile")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "TravelAgent")]
        public async Task<ActionResult<UpdateDTO>> UpdateAgentProfile(UpdateDTO agent)
        {
            try
            {
                var user = await _agent.UpdateTravelAgent(agent);
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

        [HttpGet("Agency_Location")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "TravelAgent")]
        public async Task<ActionResult<string>> GetAgencyCity(string key)
        {
            try
            {
                var user = await _agent.GetAgentCity(key);
                if (user == null)
                {
                    return BadRequest(new Error(1, "Unable to get the agency location."));
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
