using BookingMicroService.Models.DTO;
using BookingMicroService.Models;
using BookingMicroService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookingMicroService.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace BookingMicroService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class BookingController : ControllerBase
    {
        private readonly IManageBooking _bookingService;

        public BookingController(IManageBooking bookingService)
        {
            _bookingService = bookingService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(Booking), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Traveller")]

        public async Task<ActionResult<Booking>> AddBooking(Booking booking)
        {
            var addedBooking = await _bookingService.AddBooking(booking);
            if (addedBooking == null)
            {
                return BadRequest("Unable to add booking");
            }
            return Created("Home", addedBooking);
        }
        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<Booking>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<Booking>> GetBoooking(int id)
        {
            var booking = await _bookingService.GetBooking(id);
            if (booking == null)
            {
                return NotFound("No booking are available at the moment");
            }
            return Ok(booking);
        }
        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<ICollection<Booking>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Traveller")]

        public async Task<ActionResult<ICollection<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBooking();
            if (bookings == null)
            {
                return NotFound("No bookings are available at the moment");
            }
            return Ok(bookings);
        }
        [HttpPut]
        [ProducesResponseType(typeof(ActionResult<Booking>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Traveller")]

        public async Task<ActionResult<Booking>> UpdateBooking(Booking booking)
        {
            var updatedBooking = await _bookingService.UpdateBooking(booking);
            if (updatedBooking != null)
            {
                return Ok(updatedBooking);
            }
            return BadRequest("Unable to update booking details");
        }
        [HttpPut]
        [ProducesResponseType(typeof(ActionResult<Booking>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize(Roles = "Traveller")]

        public async Task<ActionResult<Booking>> UpdateBookingStatus(BookingDTO bookingDTO)
        {
            var updatedBooking = await _bookingService.UpdateBookingStatus(bookingDTO);
            if (updatedBooking != null)
            {
                return Ok(updatedBooking);
            }
            return BadRequest("Unable to update booking details");
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ActionResult<Booking>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Traveller")]

        public async Task<ActionResult<Booking>> DeleteBooking(int id)
        {
            var booking = await _bookingService.DeleteBooking(id);
            if (booking != null)
            {
                return Ok(booking);
            }
            return BadRequest("Unable to Delete booking details");
        }
    }
}
