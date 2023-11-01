using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.DTOs.Category;
using Otomobil.DTOs.Payment;
using Otomobil.Models;

namespace Otomobil.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly PaymentDataAccess _paymentDataAccess;
        public PaymentController(PaymentDataAccess paymentDataAccess)
        {
            _paymentDataAccess = paymentDataAccess;
        }

        [HttpGet("GetAllPayments")]
        public IActionResult GetAllPayments()
        {
            try
            {
                var payments = _paymentDataAccess.GetAll();

                if (payments.Count == 0)
                {
                    return NotFound("Data not found");
                }

                return Ok(payments);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public IActionResult Get(int id)
        {
            Payment? payment = _paymentDataAccess.GetById(id);

            if (payment == null)
            {
                return NotFound("Data not found");
            }

            return Ok(payment);
        }

        [HttpGet("GetAllActivePayment")]
        public IActionResult GetAllActivate()
        {
            try
            {
                var payments = _paymentDataAccess.GetAllActivate();

                if (payments.Count == 0)
                {
                    return NotFound("Data not found");
                }

                return Ok(payments);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [HttpPost("AddPaymentMethod")]
        public IActionResult AddPaymentMethod([FromBody] PaymentDTO paymentDTO)
        {
            try
            {
                Payment paymentMethod = new Payment
                {
                    Payment_name = paymentDTO.Payment_name,
                    Image = paymentDTO.Image,
                    IsActivated = paymentDTO.isActivated
                };

                bool result = _paymentDataAccess.AddPaymentMethod(paymentMethod);

                if (result)
                {
                    return StatusCode(201, paymentDTO);
                }
                else
                {
                    return StatusCode(500, "Data not inserted");
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(int id, [FromBody] PaymentDTO paymentDTO)
        {
            if (paymentDTO == null)
                return BadRequest("Data should be inputed");

            Payment payment = new Payment
            {
                Payment_name = paymentDTO.Payment_name,
                Image = paymentDTO.Image,
                IsActivated = paymentDTO.isActivated
            };

            bool result = _paymentDataAccess.Update(id, payment);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpPut("UpdateStatus")]
        public IActionResult Put(int id, [FromBody] UpdatePayment updatePayment)
        {
            if (updatePayment == null)
                return BadRequest("Data should be inputed");

            UpdatePayment update = new UpdatePayment
            {
                isActivated = updatePayment.isActivated,
            };

            bool result = _paymentDataAccess.UpdateStatusPayment(id, update);

            if (result)
            {
                return StatusCode(201, updatePayment);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }


    }
    
}
