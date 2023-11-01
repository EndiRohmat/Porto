using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.Models;
using Otomobil.DTOs.Course;
using System.Reflection.PortableExecutable;
using Otomobil.DTOs.Category;

namespace Otomobil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseDataAccess _courseDataAccess;

        public CourseController(CourseDataAccess courseDataAccess)
        {
            _courseDataAccess = courseDataAccess;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var courses = _courseDataAccess.GetAll();
            return Ok(courses);
        }
        [HttpGet("GetActiveCourse")]
        public IActionResult GetAllActivate()
        {
            var courses = _courseDataAccess.GetAllActivate();
            return Ok(courses);
        }

        [HttpGet("GetById")]
        public IActionResult Get(int id)
        {
            Course? course = _courseDataAccess.GetById(id);

            if(course == null) 
            {
                return NotFound("Data not found");
            }

            return Ok(course);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CourseDTO courseDto)
        {
            if (courseDto == null)
                return BadRequest("Data should be inputed");

            Course course = new Course
            {
                Name = courseDto.Name,
                Description = courseDto.Description,
                Image = courseDto.Image,
                Price = courseDto.Price,
                FkIdCategory = courseDto.FkIdCategory,
                IsActivated = courseDto.IsActivated
            };

            bool result = _courseDataAccess.Insert(course);

            if (result)
            {
                return StatusCode(201, course.IdCourse);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpPut]
        public IActionResult Put(int id, [FromBody] CourseDTO courseDto)
        {
            if (courseDto == null)
                return BadRequest("Data should be inputed");

            Course course = new Course
            {
                Name = courseDto.Name,
                Description = courseDto.Description,
                Price = courseDto.Price,
                Image = courseDto.Image,
                FkIdCategory = courseDto.FkIdCategory,
                IsActivated=courseDto.IsActivated
            };

            bool result = _courseDataAccess.Update(id, course);

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
        public IActionResult Put(int id, [FromBody] UpdateCourse updateCourse)
        {
            if (updateCourse == null)
                return BadRequest("Data should be inputed");

            UpdateCourse update = new UpdateCourse
            {
                isActivated = updateCourse.isActivated,
            };

            bool result = _courseDataAccess.UpdateStatusCourse(id, update);

            if (result)
            {
                return StatusCode(201, updateCourse);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            bool result = _courseDataAccess.Delete(id);

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
