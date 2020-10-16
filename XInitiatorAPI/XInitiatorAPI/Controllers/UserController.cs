using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Services.UserServices;

namespace XInitiatorAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IUserService userService;
        public readonly ILogger<UserController> logger;

        public UserController(IUserService _userService, ILogger<UserController> _logger)
        {
            userService = _userService;
            logger = _logger;
        }

        [Description("Get all Active Users")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await userService.GetAllUsers();
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }



        [Description("Add new User")]
        [HttpPost]
        public async Task<IActionResult> Add(UserAddDto userAddDto)
        {

            if(String.IsNullOrEmpty(userAddDto.Email) || String.IsNullOrEmpty(userAddDto.Name))
            {
                logger.LogError("Request Object invalid");
                return BadRequest("Request Object invalid");
            }

            try
            {
                var result = await userService.AddUser(userAddDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Get a user by Email")]
        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmail([FromRoute]string email)
        {
            try
            {
                var result = await userService.GetUserByEmail(email.ToLower());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Check has valid user")]
        [HttpGet("isUser/{email}")]
        public async Task<IActionResult> GetUserStatus([FromRoute] string email)
        {
            try
            {
                var result = await userService.HasUser(email.ToLower());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Remove User")]
        [HttpDelete("{email}")]
        public async Task<IActionResult> RemoveUser([FromRoute] string email)
        {
            try
            {
                var result = await userService.RemoveUser(email.ToLower());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Change User Status")]
        [HttpGet("changeStatus/{email}")]
        public async Task<IActionResult> ChangeStatus([FromRoute] string email)
        {
            try
            {
                var result = await userService.ChangeStatusOfUser(email.ToLower());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Get User by ID")]
        [HttpGet("userById/{userId}")]
        public async Task<IActionResult> GetUserById([FromRoute] string userId)
        {
            try
            {
                var result = await userService.GetUserById(new Guid(userId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Remove User By Id")]
        [HttpDelete("removeById/{userId}")]
        public async Task<IActionResult> RemoveUserById([FromRoute] string userId)
        {
          
            try
            {
                var result = await userService.RemoveUserById(new Guid(userId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Get All Users With Inactives")]
        [HttpGet("get")]
        public async Task<IActionResult> GetAllWithInactives()
        {

            try
            {
                var result = await userService.GetAllUsersWithInactive();
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Edit User by Id")]
        [HttpPut("{userId}")]
        public async Task<IActionResult> EditUser([FromRoute]string userId, [FromBody] UserEditDto userEditDto)
        {

            try
            {
                var result = await userService.EditUserById(new Guid(userId), userEditDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }
    }
}
