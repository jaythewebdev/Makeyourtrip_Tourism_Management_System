using BookingMicroService.Interfaces;
using BookingMicroService.Models;
using BookingMicroService.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingMicroService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCORS")]
    public class PassengerController : ControllerBase
    {
        private readonly IManagePassenger _passengerService;

        public PassengerController(IManagePassenger passengerService)
        {
            _passengerService = passengerService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(Passenger), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Passenger>> AddPassenger(Passenger passenger)
        {
            var addedPassenger = await _passengerService.AddPassenger(passenger);
            if (addedPassenger == null)
            {
                return BadRequest("Unable to add passenger");
            }
            return Created("Home", addedPassenger);
        }
        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<Passenger>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
            var passenger = await _passengerService.GetPassenger(id);
            if (passenger == null)
            {
                return NotFound("No passenger are available at the moment");
            }
            return Ok(passenger);
        }
        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<ICollection<Passenger>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Passenger>>> GetAllPassengers()
        {
            var passengers = await _passengerService.GetAllPassenger();
            if (passengers == null)
            {
                return NotFound("No passengers are available at the moment");
            }
            return Ok(passengers);
        }
        [HttpPut]
        [ProducesResponseType(typeof(ActionResult<Passenger>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Passenger>> UpdatePassenger(Passenger passenger)
        {
            var updatedPassenger = await _passengerService.UpdatePassenger(passenger);
            if (updatedPassenger != null)
            {
                return Ok(updatedPassenger);
            }
            return BadRequest("Unable to update passenger details");
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ActionResult<Passenger>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Passenger>> DeletePassenger(int id)
        {
            var passenger = await _passengerService.DeletePassenger(id);
            if (passenger != null)
            {
                return Ok(passenger);
            }
            return BadRequest("Unable to Delete passenger details");
        }
    }
}
