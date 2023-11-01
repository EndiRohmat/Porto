using MySql.Data.MySqlClient;
using Otomobil.DTOs.Cart;
using Otomobil.Models;

namespace Otomobil.DataAccess
{
    public class CartDataAccess
    {
        private readonly string _connectionString; 
        private readonly IConfiguration _configuration;

        public CartDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public bool AddCart(Cart cart)
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "INSERT INTO cart (fk_id_user, fk_id_schedule) " +
                        "VALUES (@fk_id_user, @fk_id_schedule);";

                    command.Parameters.AddWithValue("@fk_id_user", cart.Fk_id_user);
                    command.Parameters.AddWithValue("@fk_id_schedule", cart.Fk_id_schedule);

                    try
                    {
                        connection.Open();

                        int execresult = command.ExecuteNonQuery();

                        result = execresult > 0 ? true : false;
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

        public List<ListCartDTO> GetCartList(string id_user)
        { 
            List<ListCartDTO> carts = new List<ListCartDTO>();

            string query = "SELECT cart.id_cart,cart.fk_id_user, cart.fk_id_schedule, schedule_course.date, course.name AS course_name, course.price, course.image AS course_image, category.name AS type " +
                "FROM cart " +
                "JOIN schedule_course ON cart.fk_id_schedule = schedule_course.id_schedule " +
                "JOIN course ON schedule_course.fk_id_course = course.id_course " +
                "JOIN category ON course.fk_id_category = category.id_category " +
                "WHERE cart.fk_id_user = @id_user;";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = query;
                    command.Parameters.AddWithValue("@id_user", id_user);
                    try
                    {
                        connection.Open();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                carts.Add(new ListCartDTO
                                {

                                    IdCart = reader.GetInt32("id_cart"),
                                    IdUser = Guid.Parse(reader["fk_id_user"].ToString() ?? string.Empty),
                                    Category = reader["type"].ToString() ?? string.Empty,
                                    nameCourse = reader["course_name"].ToString() ?? string.Empty,
                                    Date = Convert.ToDateTime(reader["date"]),
                                    Price = Convert.ToInt32(reader["price"]),
                                    IdSchedule = Convert.ToInt32(reader["fk_id_schedule"]),
                                    Image = (byte[])reader["course_image"]
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
            return carts;
        }

        public bool DeleteCart(int id_cart)
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "DELETE FROM cart WHERE id_cart = @id_cart;";

                    Cart cart = new Cart();

                    command.Parameters.AddWithValue("@id_cart", id_cart);

                    try
                    {
                        connection.Open();

                        int execresult = command.ExecuteNonQuery();

                        result = execresult > 0 ? true : false;
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
