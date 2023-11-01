namespace Otomobil.Models
{
    public class Schedule
    {
        public int IdSchedule { get; set; }

        public DateTime Date { get; set; }

        public int FkIdCourse { get; set; }
    }
}
