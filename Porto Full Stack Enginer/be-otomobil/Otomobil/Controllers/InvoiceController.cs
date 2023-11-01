using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.Models;
using Otomobil.DTOs.Invoice;
using System.Security.Claims;

namespace Otomobil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : Controller
    {
        private readonly InvoiceDataAccess _invoiceDataAccess;

        public InvoiceController(InvoiceDataAccess invoiceDataAccess)
        {
            _invoiceDataAccess = invoiceDataAccess;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var invoices = _invoiceDataAccess.GetAll();
            return Ok(invoices);
        }

        [HttpPost("CreateInvoice")]
        public IActionResult CreateInvoice([FromBody] InvoiceDTO invoiceDTO)
        {
            try
            {
                Invoice invoices = new Invoice
                {
                    IdInvoice = Guid.NewGuid(),
                    Total_course = invoiceDTO.Total_course,
                    TotalPrice = invoiceDTO.TotalPrice,
                    Fk_id_user = invoiceDTO.Fk_id_user
                };

                bool result = _invoiceDataAccess.CreateInvoice(invoices);

                if (result)
                {
                    return StatusCode(201, invoices);
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

        [HttpGet("GetInvoicesByIdUser")]
        public IActionResult GetInvoiceByIdUser(string id_user)
        {
            try
            {
                var listOrder = _invoiceDataAccess.GetInvoicesByIdUser(id_user);

                if (listOrder.Count == 0)
                {
                    return NotFound("Data not found");
                }

                return Ok(listOrder);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("GetInvoicesById")]
        public IActionResult GetInvoiceById(string id_invoice)
        {
            try
            {
                InvoiceUserDTO? order = _invoiceDataAccess.GetOrderById(id_invoice);

                if (order == null)
                {
                    return NotFound("Data not found");
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
