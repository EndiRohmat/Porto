using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.DTOs.Cart;
using Otomobil.Models;
using System.Security.Claims;

namespace Otomobil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly CartDataAccess _cartDataAccess;

        public CartController(CartDataAccess cartDataAccess)
        {
            _cartDataAccess = cartDataAccess;
        }

        [HttpPost("AddCart")]
        public IActionResult AddCart([FromBody] CartDTO cartDTO)
        {
            try
            {
                Cart cart = new Cart
                {
                    Fk_id_user = cartDTO.Fk_id_user,
                    Fk_id_schedule = cartDTO.Fk_id_schedule
                };

                bool result = _cartDataAccess.AddCart(cart);

                if (result)
                {
                    return StatusCode(201, cartDTO);
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

        [HttpGet("GetCartByUserID")]
        public IActionResult GetCartByUserID(string id_user)
        {
            try
            {
                var cartList = _cartDataAccess.GetCartList(id_user);

                return Ok(cartList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An Error Occurs");
            }
        }

        [HttpDelete("DeleteCart")]
        public IActionResult DeleteCart(int id_cart)
        {
            try
            {
                bool result = _cartDataAccess.DeleteCart(id_cart);

                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return StatusCode(500, "Error occur");
                }

            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
