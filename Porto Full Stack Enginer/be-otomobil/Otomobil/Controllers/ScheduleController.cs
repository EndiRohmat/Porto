using Microsoft.AspNetCore.Mvc;
using Otomobil.DataAccess;
using Otomobil.DTOs.Course;
using Otomobil.DTOs.Schedule;
using Otomobil.Models;

namespace Otomobil.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : Controller
    {
        private readonly ScheduleDataAccess _scheduleDataAccess;

        public ScheduleController(ScheduleDataAccess scheduleDataAccess)
        {
            _scheduleDataAccess = scheduleDataAccess;
        }

        [HttpGet("GetByCourseId")]
        public IActionResult GetAll(int id)
        {
            var courses = _scheduleDataAccess.GetById(id);
            return Ok(courses);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ScheduleDTO scheduleDto)
        {
            if (scheduleDto == null)
                return BadRequest("Data should be inputed");

            Schedule schedule = new Schedule
            {
                Date = scheduleDto.Date,
                FkIdCourse = scheduleDto.FkIdCourse,
            };

            bool result = _scheduleDataAccess.Insert(schedule);

            if (result)
            {
                return StatusCode(201, "Success");
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpPut]
        public IActionResult Put(int id, [FromBody] ScheduleDTO ScheduleDTO)
        {
            if (ScheduleDTO == null)
                return BadRequest("Data should be inputed");

            Schedule schedule = new Schedule
            {
                Date = ScheduleDTO.Date,
                FkIdCourse = ScheduleDTO.FkIdCourse,
            };

            bool result = _scheduleDataAccess.Update(id, schedule);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            bool result = _scheduleDataAccess.Delete(id);

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
