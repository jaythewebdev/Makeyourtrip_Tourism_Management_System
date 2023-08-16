using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Numerics;
using UserMicroService.CustomExceptions;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class AdminController : ControllerBase
    {
        private readonly IManageAdmin _admin;

        public AdminController(IManageAdmin admin)
        {
            _admin = admin;
        }

        [HttpPost("Admin_Registration")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDTO>> RegisterAdmin(AdminRegisterDTO userDTO)
        {
            try
            {
                var user = await _admin.AdminRegistration(userDTO);
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

        [HttpGet("Admin_Profile")]
        [ProducesResponseType(typeof(Admin), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Admin>> AdminProfile(string key)
        {
            try
            {
                var user = await _admin.GetAdminProfile(key);
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

        [HttpGet("View_All_TravelAgents")]
        [ProducesResponseType(typeof(ActionResult<ICollection<TravelAgent>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<TravelAgent>>> ViewAllTravelAgents()
        {
            try
            {
                var user = await _admin.ViewAllAgents();
                if (user == null)
                {
                    return BadRequest(new Error(1, "No TravelAgents available"));
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


        [HttpGet("View_All_UnApproved_TravelAgents")]
        [ProducesResponseType(typeof(ActionResult<ICollection<TravelAgent>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<TravelAgent>>> ViewAllUnApprovedTravelAgents()
        {
            try
            {
                var user = await _admin.ViewAllUnapprovedAgents();
                if (user == null)
                {
                    return BadRequest(new Error(1, "No TravelAgents available"));
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

        [HttpGet("View_All_Approved_TravelAgents")]
        [ProducesResponseType(typeof(ActionResult<ICollection<TravelAgent>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<TravelAgent>>> ViewAllApprovedTravelAgents()
        {
            try
            {
                var user = await _admin.ViewAllApprovedAgents();
                if (user == null)
                {
                    return BadRequest(new Error(1, "No TravelAgents available"));
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

        [HttpGet("View_All_Travellers")]
        [ProducesResponseType(typeof(ActionResult<ICollection<Traveller>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<Traveller>>> ViewAllTravellers()
        {
            try
            {
                var user = await _admin.ViewAllTravellers();
                if (user == null)
                {
                    return BadRequest(new Error(1, "No Travellers available"));
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


        [HttpPut("Update_TravelAgent_Status")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(typeof(ActionResult<StatusDTO>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<StatusDTO>> UpdateUserStatus(StatusDTO userApproval)
        {
            try
            {
                var result = await _admin.ChangeTravelAgentStatus(userApproval);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest(new Error(1, "Unable to update the TravelAgents status"));
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



        [HttpDelete("Delete_TravelAgent")]
        [ProducesResponseType(typeof(TravelAgent), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<TravelAgent>> DeleteTravelAgent(string key)
        {
            try
            {
                var user = await _admin.DeleteTravelAgent(key);
                if (user == null)
                {
                    return BadRequest(new Error(1, "Unable to get the TravelAgent"));
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
