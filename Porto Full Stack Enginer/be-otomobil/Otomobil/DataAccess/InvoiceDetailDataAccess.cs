using MySql.Data.MySqlClient;
using Otomobil.Models;
using Otomobil.DTOs.InvoiceDetail;

namespace Otomobil.DataAccess
{
    public class InvoiceDetailDataAccess
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public InvoiceDetailDataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public bool addInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            bool result = false;
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    command.Connection = connection;
                    command.Parameters.Clear();

                    command.CommandText = "INSERT INTO `detail_invoice` (id_detail_invoice, fk_id_invoice, fk_id_schedule) " +
                        "VALUES (DEFAULT, @fk_id_invoice, @fk_id_schedule);";

                    command.Parameters.AddWithValue("@fk_id_invoice", invoiceDetail.Fk_id_invoice);
                    command.Parameters.AddWithValue("@fk_id_schedule", invoiceDetail.Fk_id_schedule);

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

        public List<InvoiceDetailUserDTO> GetDetailInvoice(string id_invoice)
        {
            List<InvoiceDetailUserDTO> detailInvoice = new List<InvoiceDetailUserDTO>();

            string query = "SELECT c.name AS course_name, cat.name AS category_name, sc.date, c.price " +
                "FROM `detail_invoice` di " +
                "INNER JOIN schedule_course sc ON di.fk_id_schedule = sc.id_schedule " +
                "INNER JOIN course c ON sc.fk_id_course = c.id_course " +
                "INNER JOIN category cat ON c.fk_id_category = cat.id_category " +
                "WHERE di.fk_id_invoice = @id_invoice";

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
                                detailInvoice.Add(new InvoiceDetailUserDTO
                                {
                                    Title = reader["course_name"].ToString() ?? string.Empty,
                                    Category = reader["category_name"].ToString() ?? string.Empty,
                                    Date = Convert.ToDateTime(reader["date"]),
                                    Price = Convert.ToDecimal(reader["price"])
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
            return detailInvoice;

        }

        public List<MyClassDTO> GetMyClass(string id_user)
        {
            List<MyClassDTO> myClass = new List<MyClassDTO>();

            string query = "SELECT di.id_detail_invoice, inv.id_invoice, inv.fk_id_user, sc.date, c.name AS course_name, c.image, cat.name AS category_name " +
                "FROM `detail_invoice` di " +
                "INNER JOIN invoices inv ON di.fk_id_invoice = inv.id_invoice " +
                "INNER JOIN schedule_course sc ON di.fk_id_schedule = sc.id_schedule " +
                "INNER JOIN course c ON sc.fk_id_course = c.id_course " +
                "INNER JOIN category cat ON c.fk_id_category = cat.id_category " +
                "WHERE inv.fk_id_user = @id_user;";

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
                                myClass.Add(new MyClassDTO
                                {
                                    Category = reader["category_name"].ToString() ?? string.Empty,
                                    Title = reader["course_name"].ToString() ?? string.Empty,
                                    Date = Convert.ToDateTime(reader["date"]),
                                    Image = (byte[])reader["image"]
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
            return myClass;
        }
    }
}
