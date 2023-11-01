using MySql.Data.MySqlClient;
using Otomobil.DTOs.Category;
using Otomobil.Models;

namespace Otomobil.DataAccess
{
    public class CategoryDataAccess
    {
        private readonly string _connectionString; //"server=localhost;port=3307;database=bookdb;user=root;password=";
        private readonly IConfiguration _configuration;

        public CategoryDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public List<Category> GetAll()
        {
            List<Category> categories = new List<Category>();
            string query = "SELECT * FROM category";

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
                                categories.Add(new Category
                                {
                                    IdCategory = reader.GetInt32("id_category"),
                                    Name = reader.GetString("name"),
                                    // Baca gambar sebagai byte array
                                    Image = (byte[])reader["image"], 
                                    Description = reader.GetString("description"),
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

            return categories;
        }
        public List<Category> GetAllActivate()
        {
            List<Category> categories = new List<Category>();
            string query = "SELECT * FROM category WHERE is_activated = 1";

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
                                categories.Add(new Category
                                {
                                    IdCategory = reader.GetInt32("id_category"),
                                    Name = reader.GetString("name"),
                                    // Baca gambar sebagai byte array
                                    Image = (byte[])reader["image"],
                                    Description = reader.GetString("description"),
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

            return categories;
        }

        public Category? GetById(int id) 
        {
            Category? category = null;

            string query = "SELECT * FROM category WHERE id_category = @Id";

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
                                category = new Category
                                {
                                    IdCategory = reader.GetInt32("id_category"),
                                    Name = reader.GetString("name"),
                                    Image = (byte[])reader["image"], 
                                    Description = reader.GetString("description"),
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
            return category;
        }

        public bool UpdateStatusCategory(int id, UpdateCategory updateCategory)
        {
            bool result = false;
            string query = $"UPDATE category SET is_activated = b'{updateCategory.isActivated}' " +
                "WHERE id_category = @Id";

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


        public bool Insert(Category category)
        {
            bool result = false;

            string query = $"INSERT INTO category (name, image, description, is_activated) " +
               $"VALUES (@Name, @Image, @Description, @is_activated)";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Name", category.Name);
                        command.Parameters.AddWithValue("@Image", category.Image);
                        command.Parameters.AddWithValue("@Description", category.Description);
                        command.Parameters.AddWithValue("@is_activated", category.IsActivated);

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

        public bool Update(int id, Category category)
        {
            bool result = false;

            string query = $"UPDATE category SET name = @Name, image = @Image, description = @Description, is_activated = @is_activated " +
                "WHERE id_category = @Id";

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
                        command.Parameters.AddWithValue("@Name", category.Name);
                        command.Parameters.AddWithValue("@Image", category.Image);
                        command.Parameters.AddWithValue("@Description", category.Description);
                        command.Parameters.AddWithValue("@is_activated", category.IsActivated);

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

            string query = "DELETE FROM category WHERE id_category = @IdCategory";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Parameters.AddWithValue("@IdCategory", id);
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
