using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using Otomobil.DataAccess;
using Otomobil.DTOs.Category;
using Otomobil.DTOs.Course;
using Otomobil.DTOs.User;
using Otomobil.Emails;
using Otomobil.Emails.Template;
using Otomobil.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Otomobil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDataAccess _userData;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public UserController(UserDataAccess userData, IConfiguration configuration, EmailService emailService)
        {
            _userData = userData;
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userData.GetAll();
            return Ok(users);
        }
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto) 
        {
            try
            {
                User user = new User
                {
                    Id = Guid.NewGuid(),
                    Username = userDto.Username,
                    Email = userDto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                    IsActivated = false
                };

                UserRole userRole = new UserRole
                {
                    UserId = user.Id,
                    Role = userDto.Role
                };

                User? cekemail = _userData.CheckUser(user.Email);

                if (cekemail != null)
                {
                    return StatusCode(400, "Email sudah terdaftar");
                }

                bool result = _userData.CreateUserAccount(user, userRole);

                if (result)
                {
                    bool mailResult = await SendMailActivation(user);
                    return StatusCode(201, userDto);
                }
                else
                {
                    return StatusCode(500, "Data not inserted");
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

        }

        [HttpPut("PutUser")]
        public IActionResult PutUser(string id, [FromBody] PutUser putUser)
        {
            if (putUser == null)
                return BadRequest("Data should be inputed");

            PutUser user = new PutUser
            {
                Username = putUser.Username,
                Email = putUser.Email,
                IsActivated = putUser.IsActivated
            };

            bool result = _userData.UpdateUser(id, user);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpPut("PutUserRole")]
        public IActionResult PutUserRole(string id, [FromBody] PutRole putRole)
        {
            if (putRole == null)
                return BadRequest("Data should be inputed");

            PutRole role = new PutRole
            {
                Role = putRole.Role,

            };

            bool result = _userData.UpdateUserRole(id, role);

            if (result)
            {
                return NoContent();
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

        [HttpGet("GetByIdUser")]
        public IActionResult GetByIdUser(string id)
        {
            try
            {
                AllUser? user = _userData.GetById(id);

                if (user == null)
                {
                    return NotFound("Data not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO credential)
        {
            if (credential is null)
                return BadRequest("Invalid client request");

            if (string.IsNullOrEmpty(credential.Email) || string.IsNullOrEmpty(credential.Password))
                return BadRequest("Invalid client request");

            User? user = _userData.CheckUser(credential.Email);

            if (user == null)
                return Unauthorized("You do not authorized");

            if (user.IsActivated != true)
            {
               return Unauthorized("Your account has not activated");
            }

            UserRole? userRole = _userData.GetUserRole(user.Id);


            bool isVerified = BCrypt.Net.BCrypt.Verify(credential.Password, user.Password);

            if (user != null && !isVerified)
            {
                return BadRequest("Incorrect Password! Please check your password!");
            }
            else
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtConfig:Key").Value));

                var claims = new Claim[] {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Role, userRole.Role)
                };

                var signingCredential = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    SigningCredentials = signingCredential
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var securityToken = tokenHandler.CreateToken(tokenDescriptor);

                string token = tokenHandler.WriteToken(securityToken);

                return Ok(new LoginResponseDTO 
                { 
                    Token = token 
                });
            }
        }

        [HttpGet("ActivateUser")]
        public IActionResult ActivateUser(Guid userId, string email)
        {
            try
            {
                User? user = _userData.CheckUser(email);

                if (user == null)
                    return BadRequest("Activation Failed");

                if (user.IsActivated == true)
                    return BadRequest("Account has been activated");

                bool result = _userData.AcitvateUser(userId);

                if (result)
                    //return Ok("User Activated Successfully");
                    return Redirect("http://localhost:5173/register/success");
                    //return Redirect("http://52.237.194.35:2027/register/success");

                else
                    return BadRequest("Activation Failed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("SendMailUser")]
        public async Task<IActionResult> SendMailUser([FromBody] string mailTo)
        {
            List<string> to = new List<string>();
            to.Add(mailTo);

            string subject = "Test Email Bootcamp";
            string body = "Hallo, First Email";

            EmailModel model = new EmailModel(to, subject, body);

            bool sendMail = await _emailService.SendAsync(model, new CancellationToken());

            if (sendMail)
                return Ok("Send");
            else
                return StatusCode(500, "Error");
        }

        private async Task<bool> SendMailActivation(User user)
        {
            if (user == null)
                return false;

            if (string.IsNullOrEmpty(user.Email))
                return false;
            
            List<string> to = new List<string>();
            to.Add(user.Email);

            string subject = "Account Activation";

            var param = new Dictionary<string, string>()
            {
                {"userId", user.Id.ToString() },
                { "email", user.Email }
            };

            string callback = QueryHelpers.AddQueryString("https://localhost:7078/api/User/ActivateUser", param);
            //string callback = QueryHelpers.AddQueryString("http://52.237.194.35:2028/api/User/ActivateUser", param);


            //string body = "Please confirm account by clicking this <a href=\"" + callback + "\"> Link</a>";

            string body = _emailService.GetMailTemplate("EmailActivation", new ActivationModel()
            {
                Email = user.Email,
                Link = callback
            });


            EmailModel emailModel = new EmailModel(to, subject, body);
            bool mailResult = await _emailService.SendAsync(emailModel, new CancellationToken());

            return mailResult;

        }

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                    return BadRequest("Email is empty");

                bool sendMail = await SendEmailForgetPassword(email);

                if (sendMail)
                {
                    return Ok("Mail sent");
                }
                else
                {
                    return StatusCode(500, "Error");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword([FromBody] ResetPasswordDTO resetPassword)
        {
            try
            {
                if (resetPassword == null)
                    return BadRequest("No Data");

                if (resetPassword.Password != resetPassword.ConfirmPassword)
                {
                    return BadRequest("Password doesn't match");
                }

                bool reset = _userData.ResetPassword(resetPassword.Email, BCrypt.Net.BCrypt.HashPassword(resetPassword.Password));

                if (reset)
                {
                    return Ok("Reset password OK");
                }
                else
                {
                    return StatusCode(500, "Error");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private async Task<bool> SendEmailForgetPassword(string email)
        {
            // send email
            List<string> to = new List<string>();
            to.Add(email);

            string subject = "Forget Password";

            var param = new Dictionary<string, string?>
                    {
                        {"email", email }
                    };

            string callbackUrl = QueryHelpers.AddQueryString("http://localhost:5173/new-password", param);
            //string callbackUrl = QueryHelpers.AddQueryString("http://52.237.194.35:2027/new-password", param);



            string body = "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>";

            EmailModel mailModel = new EmailModel(to, subject, body);

            bool mailResult = await _emailService.SendAsync(mailModel, new CancellationToken());

            return mailResult;

        }

        [HttpPut("UpdateStatus")]
        public IActionResult Put(string id, [FromBody] UpdateUser updateUser)
        {
            if (updateUser == null)
                return BadRequest("Data should be inputed");

            UpdateUser update = new UpdateUser
            {
                IsActivated = updateUser.IsActivated,
            };

            bool result = _userData.UpdateStatusUser(id, update);

            if (result)
            {
                return StatusCode(201, updateUser);
            }
            else
            {
                return StatusCode(500, "Error occur");
            }
        }

    }
}
