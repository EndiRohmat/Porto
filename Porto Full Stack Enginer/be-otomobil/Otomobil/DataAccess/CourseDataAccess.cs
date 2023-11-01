using MySql.Data.MySqlClient;
using Otomobil.DTOs.Course;
using Otomobil.Models;
using System.Diagnostics.Eventing.Reader;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;

namespace Otomobil.DataAccess
{
    public class CourseDataAccess
    {
        private readonly string _connectionString; //"server=localhost;port=3307;database=bookdb;user=root;password=";
        private readonly IConfiguration _configuration;
        public CourseDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public List<Course> GetAll()
        {
            List<Course> courses = new List<Course>();

            string query = "SELECT course.id_course,course.is_activated, course.name AS course_name, course.image, course.price, course.description, course.fk_id_category, category.name AS category_name FROM course INNER JOIN category ON course.fk_id_category = category.id_category";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using(MySqlCommand comm= new MySqlCommand(query, connection))
                {
                    try
                    {
                        connection.Open();

                        using (MySqlDataReader reader = comm.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                courses.Add(new Course
                                {
                                    IdCourse = reader.GetInt32("id_course"),
                                    Name = reader.GetString("course_name"),
                                    // Baca gambar sebagai byte array
                                    Image = (byte[])reader["image"], 
                                    Description = reader.GetString("description"),
                                    Price = reader.GetDecimal("price"),
                                    FkIdCategory = reader.GetInt32("fk_id_category"),
                                    Category = reader.GetString("category_name"),
                                    IsActivated = reader.GetBoolean("is_activated")
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

            return courses;
        }

        public List<Course> GetAllActivate()
        {
            List<Course> courses = new List<Course>();

            string query = "SELECT course.id_course,course.is_activated, course.name AS course_name, course.image, course.price, course.description, course.fk_id_category, category.name AS category_name FROM course INNER JOIN category ON course.fk_id_category = category.id_category WHERE course.is_activated = 1;";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand comm = new MySqlCommand(query, connection))
                {
                    try
                    {
                        connection.Open();

                        using (MySqlDataReader reader = comm.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                courses.Add(new Course
                                {
                                    IdCourse = reader.GetInt32("id_course"),
                                    Name = reader.GetString("course_name"),
                                    // Baca gambar sebagai byte array
                                    Image = (byte[])reader["image"],
                                    Description = reader.GetString("description"),
                                    Price = reader.GetDecimal("price"),
                                    FkIdCategory = reader.GetInt32("fk_id_category"),
                                    Category = reader.GetString("category_name"),
                                    IsActivated = reader.GetBoolean("is_activated")
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

            return courses;
        }


        public Course? GetById(int id)
        {
            Course? course = null;

            string query = "SELECT course.id_course, course.is_activated, course.name AS course_name, course.image, course.price, course.description, course.fk_id_category, category.name AS category_name FROM course INNER JOIN category ON course.fk_id_category = category.id_category WHERE id_course = @Id";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();

                        command.Parameters.AddWithValue("@Id", id);
                        connection.Open();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                course = new Course
                                {
                                    IdCourse = reader.GetInt32("id_course"),
                                    Name = reader.GetString("course_name"),
                                    Image = (byte[])reader["image"], 
                                    Description = reader.GetString("description"),
                                    Price = reader.GetDecimal("price"),
                                    FkIdCategory = reader.GetInt32("fk_id_category"),
                                    Category = reader.GetString("category_name"),
                                    IsActivated = reader.GetBoolean("is_activated")
                                };
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
            return course;
        }

        public bool Insert(Course course)
        {
            bool result = false;

            string query = $"INSERT INTO course (name, image, description, price, fk_id_category, is_activated) " +
               $"VALUES (@Name, @Image, @Description, @Price, @FkIdCategory, @isActivated)";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Name", course.Name);
                        command.Parameters.AddWithValue("@Image", course.Image);
                        command.Parameters.AddWithValue("@Description", course.Description);
                        command.Parameters.AddWithValue("@Price", course.Price);
                        command.Parameters.AddWithValue("@FkIdCategory", course.FkIdCategory);
                        command.Parameters.AddWithValue("@isActivated", course.IsActivated);


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

        public bool Update(int id, Course course)
        {
            bool result = false;

            string query = $"UPDATE course SET name = @Name, image = @Image, description = @Description, price = @Price, fk_id_category = @FkIdCategory, is_activated = @isActivated  " +
                "WHERE id_course = @Id";

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
                        command.Parameters.AddWithValue("@Name", course.Name);
                        command.Parameters.AddWithValue("@Image", course.Image);
                        command.Parameters.AddWithValue("@Description", course.Description);
                        command.Parameters.AddWithValue("@Price", course.Price);
                        command.Parameters.AddWithValue("@FkIdCategory", course.FkIdCategory);
                        command.Parameters.AddWithValue("@isActivated", course.IsActivated);
                        

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

        public bool UpdateStatusCourse(int id, UpdateCourse updateCourse)
        {
            bool result = false;
            string query = $"UPDATE course SET is_activated = b'{updateCourse.isActivated}' " +
                "WHERE id_course = @Id";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Parameters.AddWithValue("@Id", id);
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
        public bool Delete(int id)
        {
            bool result = false;

            string query = "DELETE FROM course WHERE id_course = @IdCourse";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Parameters.AddWithValue("@IdCourse", id);
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
