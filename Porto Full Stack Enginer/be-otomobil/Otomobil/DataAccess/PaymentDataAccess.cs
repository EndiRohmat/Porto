using MySql.Data.MySqlClient;
using Otomobil.DTOs.Payment;
using Otomobil.Models;

namespace Otomobil.DataAccess
{
    public class PaymentDataAccess
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public PaymentDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public List<Payment> GetAll() 
        {
            List<Payment> payments = new List<Payment>();

            string query = "SELECT * FROM payment";

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
                                payments.Add(new Payment
                                {
                                    Id_payment = reader.GetInt32("id_payment"),
                                    Payment_name = reader["payment_name"].ToString() ?? string.Empty,
                                    Image = (byte[])reader["image"],
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

            return payments;
        }

        public Payment? GetById(int id)
        {
            Payment payment = null;
            string query = "SELECT * FROM payment WHERE id_payment = @Id";
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
                                payment = new Payment
                                {
                                    Id_payment = reader.GetInt32("id_payment"),
                                    Payment_name = reader["payment_name"].ToString() ?? string.Empty,
                                    Image = (byte[])reader["image"],
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
            return payment;
        }

        public List<Payment> GetAllActivate()
        {
            List<Payment> payments = new List<Payment>();

            string query = "SELECT * FROM payment WHERE is_activated = 1";

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
                                payments.Add(new Payment
                                {
                                    Id_payment = reader.GetInt32("id_payment"),
                                    Payment_name = reader["payment_name"].ToString() ?? string.Empty,
                                    Image = (byte[])reader["image"],
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

            return payments;
        }

        public bool AddPaymentMethod(Payment payment)
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "INSERT INTO payment (payment_name, image, is_activated )" +
                        "VALUES (@payment_name, @image, @is_activated);";

                    command.Parameters.AddWithValue("@payment_name", payment.Payment_name);
                    command.Parameters.AddWithValue("@image", payment.Image);
                    command.Parameters.AddWithValue("@is_activated", payment.IsActivated);

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

        public bool Update(int id, Payment payment)
        {
            bool result = false;

            string query = $"UPDATE payment SET payment_name = @Name, image = @Image, is_activated = @isActivated  " +
                "WHERE id_payment = @Id";

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
                        command.Parameters.AddWithValue("@Name", payment.Payment_name);
                        command.Parameters.AddWithValue("@image", payment.Image);
                        command.Parameters.AddWithValue("@isActivated", payment.IsActivated);

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

        public bool UpdateStatusPayment(int id, UpdatePayment updatePayment)
        {
            bool result = false;
            string query = $"UPDATE payment SET is_activated = b'{updatePayment.isActivated}' " +
                "WHERE id_payment = @Id";

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
