using MySql.Data.MySqlClient;
using Otomobil.DTOs.Invoice;
using Otomobil.Models;
using System;
using System.Xml.Linq;

namespace Otomobil.DataAccess
{
    public class InvoiceDataAccess
    {
        private readonly string _connectionString;  //"server=localhost;port=3307;database=bookdb;user=root;password=";
        private readonly IConfiguration _configuration;
        public InvoiceDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public List<InvoiceAllDTO> GetAll()
        {
            List<InvoiceAllDTO> invoices = new List<InvoiceAllDTO>();

            string query = "SELECT u.username, i.id_invoice, i.created_at, i.total_price, i.fk_id_user, i.id_oto, i.jumlah_course " +
                "FROM invoices i INNER JOIN users u ON i.fk_id_user = u.id;";

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
                                invoices.Add(new InvoiceAllDTO
                                {
                                    IdInvoice = Guid.Parse(reader["id_invoice"].ToString() ?? string.Empty),
                                    //Invoice = (byte[])reader["nomor_invoice"],
                                    //Invoice = reader.GetString("nomor_invoice"),
                                    IdOto = Convert.ToInt32(reader["id_oto"]),
                                    Total_course = Convert.ToInt32(reader["jumlah_course"]),
                                    TotalPrice = Convert.ToInt32(reader["total_price"]),
                                    Date = Convert.ToDateTime(reader["created_at"]),
                                    Name = reader.GetString("username")
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
        public bool CreateInvoice(Invoice invoice) 
        {
            bool result = false;

            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "INSERT INTO `invoices` (id_invoice, jumlah_course, created_at, total_price, fk_id_user) " +
                        "VALUES (@id_invoice, @jumlah_course, DEFAULT, @total_price, @fk_id_user);";

                    command.Parameters.AddWithValue("@id_invoice", invoice.IdInvoice);
                    command.Parameters.AddWithValue("@jumlah_course", invoice.Total_course);
                    command.Parameters.AddWithValue("@total_price", invoice.TotalPrice);
                    command.Parameters.AddWithValue("@fk_id_user", invoice.Fk_id_user);

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
       
        public List<InvoiceUserDTO> GetInvoicesByIdUser(string id_user) 
        {
            List<InvoiceUserDTO> invoices = new List<InvoiceUserDTO>();

            string query = "SELECT id_oto, id_invoice, jumlah_course, created_at, total_price, fk_id_user " +
                "FROM `invoices` WHERE fk_id_user = @id_user;";
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
                                invoices.Add(new InvoiceUserDTO
                                {
                                    IdInvoice = Guid.Parse(reader["id_invoice"].ToString() ?? string.Empty),
                                    //Invoice = (byte[])reader["nomor_invoice"],
                                    Invoice = Convert.ToInt32(reader["id_oto"]),
                                    Total_course = Convert.ToInt32(reader["jumlah_course"]),
                                    TotalPrice = Convert.ToInt32(reader["total_price"]),
                                    Date = Convert.ToDateTime(reader["created_at"]),
                                    Fk_id_user = reader.GetString("fk_id_user")
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

        public InvoiceUserDTO? GetOrderById(string id_invoice)
        {
            InvoiceUserDTO? invoices = null;

            string query = "SELECT id_oto, id_invoice, jumlah_course, created_at, total_price, fk_id_user " +
                "FROM `invoices` WHERE id_invoice = @id_invoice;";
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = query;
                    command.Parameters.AddWithValue("@id_invoice", id_invoice);

                    try
                    {
                        connection.Open();

                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                
                                
                                invoices = new InvoiceUserDTO
                                {
                                    IdInvoice = Guid.Parse(reader["id_invoice"].ToString() ?? string.Empty),
                                    //Invoice = (byte[])reader["nomor_invoice"],
                                    Invoice = Convert.ToInt32(reader["id_oto"]),
                                    Total_course = Convert.ToInt32(reader["jumlah_course"]),
                                    TotalPrice = Convert.ToInt32(reader["total_price"]),
                                    Date = Convert.ToDateTime(reader["created_at"]),
                                    Fk_id_user = reader.GetString("fk_id_user")
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

            return invoices;
        }


    }
}
