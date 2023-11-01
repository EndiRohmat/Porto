using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.DTOs.Category;
using Otomobil.DTOs.Payment;
using Otomobil.Models;

namespace Otomobil.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly CategoryDataAccess _categoryDataAccess;

        public CategoryController(CategoryDataAccess categoryDataAccess) 
        {
            _categoryDataAccess = categoryDataAccess;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var courses = _categoryDataAccess.GetAll();
            return Ok(courses);
        }
        [HttpGet("GetActiveCategory")]
        public IActionResult GetAllActivate()
        {
            var courses = _categoryDataAccess.GetAllActivate();
            return Ok(courses);
        }

        [HttpGet("GetById")]
        public IActionResult Get(int id)
        {
            Category? category = _categoryDataAccess.GetById(id);

            if (category == null)
            {
                return NotFound("Data not found");
            }

            return Ok(category);
        }

        [HttpPost("InputCategory")]
        public IActionResult Post([FromBody] CategoryDTO categoryDto)
        {
            if (categoryDto == null)
                return BadRequest("Data should be inputed");

            Category category = new Category
            {
                Name = categoryDto.Name,
                Image = categoryDto.Image,
                Description = categoryDto.Description,
                IsActivated = categoryDto.IsActivated,
            };

            bool result = _categoryDataAccess.Insert(category);

            if (result)
            {
                return StatusCode(201, category.IdCategory);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpPut]
        public IActionResult Put(int id, [FromBody] CategoryDTO categoryDto)
        {
            if (categoryDto == null)
                return BadRequest("Data should be inputed");

            Category category = new Category
            {
                Name = categoryDto.Name,
                Image = categoryDto.Image,
                Description = categoryDto.Description,
                IsActivated = categoryDto.IsActivated,
            };

            bool result = _categoryDataAccess.Update(id, category);

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
        public IActionResult Put(int id, [FromBody] UpdateCategory updateCategory)
        {
            if (updateCategory == null)
                return BadRequest("Data should be inputed");

            UpdateCategory update = new UpdateCategory
            {
                isActivated = updateCategory.isActivated,
            };

            bool result = _categoryDataAccess.UpdateStatusCategory(id, update);

            if (result)
            {
                return StatusCode(201, updateCategory);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            bool result = _categoryDataAccess.Delete(id);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }
    }
}
