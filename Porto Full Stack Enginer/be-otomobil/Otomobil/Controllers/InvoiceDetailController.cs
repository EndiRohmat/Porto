using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.DTOs.InvoiceDetail;
using Otomobil.Models;
using System.Security.Claims;

namespace Otomobil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailController : Controller
    {
        private readonly InvoiceDetailDataAccess _invoiceDetailDataAccess;

        public InvoiceDetailController(InvoiceDetailDataAccess invoiceDetailDataAccess)
        {
            _invoiceDetailDataAccess = invoiceDetailDataAccess;
        }

        [HttpPost("AddInvoiceDetail")]

        public IActionResult AddInvoiceDetail([FromBody] InvoiceDetailDTO invoiceDetailDTO)
        {
            try
            {
                InvoiceDetail detail = new InvoiceDetail
                {
                    Id_detail = default,
                    Fk_id_invoice = invoiceDetailDTO.Fk_id_invoice,
                    Fk_id_schedule = invoiceDetailDTO.Fk_id_schedule
                };

                bool result = _invoiceDetailDataAccess.addInvoiceDetail(detail);

                if (result)
                {
                    return StatusCode(201, invoiceDetailDTO);
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

        [HttpGet("GetDetailInvoice")]
        public IActionResult GetDetailInvoice(string id_invoice)
        {
            try
            {
                var details = _invoiceDetailDataAccess.GetDetailInvoice(id_invoice);

                if (details.Count() == 0)
                {
                    return NotFound("Data not found");
                }
                return Ok(details);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("GetMyClass")]
        public IActionResult GetMyClass(string id_user)
        {
            try
            {
                var classList = _invoiceDetailDataAccess.GetMyClass(id_user);

                if (classList.Count == 0)
                {
                    return NotFound("Data not found");
                }

                return Ok(classList);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
