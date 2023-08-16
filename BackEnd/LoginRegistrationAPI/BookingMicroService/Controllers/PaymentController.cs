using BookingMicroService.Interfaces;
using BookingMicroService.Models.DTO;
using BookingMicroService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingMicroService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class PaymentController : ControllerBase
    {
        private readonly IManagePayment _paymentService;

        public PaymentController(IManagePayment paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Payment), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> AddPayment(Payment Payment)
        {
            var addedPayment = await _paymentService.AddPayment(Payment);
            if (addedPayment == null)
            {
                return BadRequest("Unable to add Payment");
            }
            return Created("Home", addedPayment);
        }

        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<Payment>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> GetBoooking(int id)
        {
            var Payment = await _paymentService.GetPayment(id);
            if (Payment == null)
            {
                return NotFound("No Payment are available at the moment");
            }
            return Ok(Payment);
        }

        [HttpGet]
        [ProducesResponseType(typeof(ActionResult<ICollection<Payment>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<Payment>>> GetAllPayments()
        {
            var Payments = await _paymentService.GetAllPayment();
            if (Payments == null)
            {
                return NotFound("No Payments are available at the moment");
            }
            return Ok(Payments);
        }

        [HttpPut]
        [ProducesResponseType(typeof(ActionResult<Payment>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> UpdatePaymentStatus(PaymentDTO PaymentDTO)
        {
            var updatedPayment = await _paymentService.UpdatePaymentStatus(PaymentDTO);
            if (updatedPayment != null)
            {
                return Ok(updatedPayment);
            }
            return BadRequest("Unable to update Payment details");
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ActionResult<Payment>), StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> DeletePayment(int id)
        {
            var Payment = await _paymentService.DeletePayment(id);
            if (Payment != null)
            {
                return Ok(Payment);
            }
            return BadRequest("Unable to Delete Payment details");
        }
    }
}
