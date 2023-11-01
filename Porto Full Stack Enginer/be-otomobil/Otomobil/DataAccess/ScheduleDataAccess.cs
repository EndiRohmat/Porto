using MySql.Data.MySqlClient;
using Otomobil.Models;

namespace Otomobil.DataAccess
{
    public class ScheduleDataAccess
    {
        private readonly string _connectionString; //"server=localhost;port=3307;database=bookdb;user=root;password=";
        private readonly IConfiguration _configuration;
        public ScheduleDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public List<Schedule> GetById(int id)
        {
            List<Schedule> schedules = new List<Schedule>();
            string query = "SELECT * FROM schedule_course WHERE fk_id_course = @Id";


            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand comm = new MySqlCommand(query, connection))
                {
                    try
                    {
                        comm.Connection = connection;
                        comm.Parameters.Clear();

                        comm.Parameters.AddWithValue("@Id", id);
                        connection.Open();

                        using (MySqlDataReader reader = comm.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                schedules.Add(new Schedule
                                {
                                    IdSchedule = reader.GetInt32("id_schedule"),
                                    Date = Convert.ToDateTime(reader["date"]),
                                    FkIdCourse = reader.GetInt32("fk_id_course"),
                                });
                            }
                        }
                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }

            return schedules;
        }

        public bool Insert(Schedule schedule)
        {
            bool result = false;

            string query = $"INSERT INTO schedule_course (date, fk_id_course) " +
               $"VALUES (@Date, @FkIdCourse)";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Date", schedule.Date);
                        command.Parameters.AddWithValue("@FkIdCourse", schedule.FkIdCourse);

                        connection.Open();

                        result = command.ExecuteNonQuery() > 0 ? true : false;
                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        connection.Close();
                    }

                }
            }

            return result;
        }

        public bool Update(int id, Schedule schedule)
        {
            bool result = false;

            string query = $"UPDATE schedule_course SET date = @Date, fk_id_course = @FkIdCourse " +
                "WHERE id_schedule = @Id";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Id", id);
                        command.Parameters.AddWithValue("@Date", schedule.Date);
                        command.Parameters.AddWithValue("@FkIdCourse", schedule.FkIdCourse);

                        connection.Open();

                        result = command.ExecuteNonQuery() > 0 ? true : false;
                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        connection.Close();
                    }

                }
            }

            return result;
        }

        public bool Delete(int id)
        {
            bool result = false;

            string query = "DELETE FROM schedule_course WHERE id_schedule = @IdSchedule";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Parameters.AddWithValue("@IdSchedule", id);
                        command.Connection = connection;
                        command.CommandText = query;

                        connection.Open();

                        result = command.ExecuteNonQuery() > 0 ? true : false;

                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }

            return result;
        }
    }
}
