using MySql.Data.MySqlClient;
using Otomobil.DTOs.Course;
using Otomobil.DTOs.Invoice;
using Otomobil.DTOs.User;
using Otomobil.Models;

namespace Otomobil.DataAccess
{
    public class UserDataAccess
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public UserDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public List<AllUser> GetAll()
        {
            List<AllUser> invoices = new List<AllUser>();

            string query = "SELECT u.*, ur.role " +
               "FROM users u LEFT JOIN userroles ur ON u.id = ur.user_id;";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = query;

                    try
                    {
                        connection.Open();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                invoices.Add(new AllUser
                                {
                                    Id = Guid.Parse(reader["id"].ToString() ?? string.Empty),
                                    Username = reader.GetString("username"),
                                    Email = reader.GetString("email"),
                                    Role = reader.GetString("role"),
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
            return invoices;
        }

        public AllUser? GetById(string id) 
        {
            AllUser? user = null;
            string query = "SELECT u.*, ur.role " +
               "FROM users u LEFT JOIN userroles ur ON u.id = ur.user_id WHERE u.id = @UserID;";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();

                        command.Parameters.AddWithValue("@UserID", id);
                        connection.Open();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                user = new AllUser
                                {
                                    Id = Guid.Parse(reader["id"].ToString() ?? string.Empty),
                                    Username = reader.GetString("username"),
                                    Email = reader.GetString("email"),
                                    Role = reader.GetString("role"),
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
            return user;

        }

        public bool UpdateUser(string Id, PutUser putUser)
        {
            bool result = false;
            string query = $"UPDATE users SET username = @username, email = @email, is_activated = @is_activated " +
                "WHERE id = @Id";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Id", Id);
                        command.Parameters.AddWithValue("@username", putUser.Username);
                        command.Parameters.AddWithValue("@email", putUser.Email);
                        command.Parameters.AddWithValue("@is_activated", putUser.IsActivated);

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

        public bool UpdateUserRole(string Id, PutRole putRole)
        {
            bool result = false;
            string query = $"UPDATE userroles SET role = @role " +
                "WHERE user_id = @Id";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    try
                    {
                        command.Connection = connection;
                        command.Parameters.Clear();
                        command.CommandText = query;

                        command.Parameters.AddWithValue("@Id", Id);
                        command.Parameters.AddWithValue("@role", putRole.Role);

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

        public bool CreateUserAccount(User user, UserRole userRole)
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                // open connection before begin transaction
                connection.Open();

                MySqlTransaction transaction = connection.BeginTransaction();

                try
                {
                    MySqlCommand command1 = new MySqlCommand();
                    command1.Connection = connection;
                    command1.Transaction = transaction;
                    command1.Parameters.Clear();

                    command1.CommandText = "INSERT INTO users (id, username, email, password, is_activated) VALUES (@id, @username, @email, @password, @IsActivated)";
                    command1.Parameters.AddWithValue("@id", user.Id);
                    command1.Parameters.AddWithValue("@username", user.Username);
                    command1.Parameters.AddWithValue("@email", user.Email);
                    command1.Parameters.AddWithValue("@password", user.Password);
                    command1.Parameters.AddWithValue("@isActivated", user.IsActivated);


                    MySqlCommand command2 = new MySqlCommand();
                    command2.Connection = connection;
                    command2.Transaction = transaction;
                    command2.Parameters.Clear();

                    command2.CommandText = "INSERT INTO userroles (user_id, role) VALUES (@userId, @role)";
                    command2.Parameters.AddWithValue("@userId", userRole.UserId);
                    command2.Parameters.AddWithValue("@role", userRole.Role);


                    var result1 = command1.ExecuteNonQuery();
                    var result2 = command2.ExecuteNonQuery();

                    transaction.Commit();

                    result = true;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
                finally
                {
                    connection.Close();
                }

            }

            return result;
        }

        public User? CheckUser(string email)
        {

            User? user = null;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * From users WHERE email = @email";

                    command.Parameters.Clear();

                    command.Parameters.AddWithValue("@email", email);

                    connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            user = new User
                            {
                                Id = Guid.Parse(reader["id"].ToString() ?? string.Empty),
                                Username = reader["username"].ToString() ?? string.Empty,
                                Email = reader["email"].ToString() ?? string.Empty,
                                Password = reader["password"].ToString() ?? string.Empty,
                                IsActivated = reader.GetBoolean("is_activated")
                            };
                        }
                    }

                    connection.Close();

                }
            }

            return user;
        }

        public UserRole? GetUserRole(Guid userId)
        {
            UserRole? userRole = null;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "SELECT * FROM userroles WHERE user_id = @userId";
                    command.Parameters.AddWithValue("@userId", userId);


                    connection.Open();

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            userRole = new UserRole
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                UserId = Guid.Parse(reader["user_id"].ToString() ?? string.Empty),
                                Role = reader["role"].ToString() ?? string.Empty
                            };

                        }
                    }

                    connection.Close();

                }
            }

            return userRole;
        }

        public bool AcitvateUser(Guid id)
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                MySqlCommand command = new MySqlCommand();
                command.Connection = connection;
                command.Parameters.Clear();

                command.CommandText = "UPDATE Users SET is_activated = 1 WHERE Id = @id";
                command.Parameters.AddWithValue("@id", id);

                try
                {
                    connection.Open();

                    result = command.ExecuteNonQuery() > 0;
                }
                catch
                {
                    throw;
                }
                finally { connection.Close(); }
            }

            return result;
        }

        public bool ResetPassword(string email, string password)
        {
            bool result = false;

            string query = "UPDATE users SET password = @Password WHERE Email = @Email";

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = query;

                    command.Parameters.AddWithValue("@Email", email);
                    command.Parameters.AddWithValue("@Password", password);

                    connection.Open();

                    result = command.ExecuteNonQuery() > 0 ? true : false;

                    connection.Close();
                }
            }

            return result;
        }

        public bool UpdateStatusUser(string id, UpdateUser updateUser)
        {
            bool result = false;
            string query = $"UPDATE users SET is_activated = b'{updateUser.IsActivated}' " +
                "WHERE id = @Id";

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


    }
}
