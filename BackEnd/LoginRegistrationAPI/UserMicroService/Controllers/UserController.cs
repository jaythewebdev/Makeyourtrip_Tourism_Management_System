using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserMicroService.Interfaces;
using UserMicroService.Models;
using UserMicroService.Models.DTO;

namespace UserMicroService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class UserController : ControllerBase
    {
        private readonly IManageUser _user;

        public UserController(IManageUser user,IChangePassword changePassword)
        {
            _user = user;
        }


        [HttpPost("Login")]
        [ProducesResponseType(typeof(ActionResult<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO userDTO)
        {
            var user = await _user.Login(userDTO);
            if (user == null)
            {
                return BadRequest("invalid username or password");
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<PasswordChangeDTO>> PasswordChange(PasswordChangeDTO Pass)
        {
            User result =await _user.UpdatePassword(Pass);
            if (result != null)
            {
                return Ok("Password Changed");
            }
            return BadRequest("Unable to Change Password at this moment");
        }
    }
}
