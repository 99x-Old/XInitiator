using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using XInitiatorAPI.Data;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.UserServices
{
    public class UserService : BaseService, IUserService
    {

        private ILogger<UserService> logger;

        public UserService(BaseContext baseContext, ILogger<UserService> _logger) : base(baseContext)
        {
            logger = _logger;
        }

        public async Task<User> AddUser(UserAddDto userAddDto)
        {
            try
            {

                if (await HasUser(userAddDto.Email.ToLower()))
                    throw new Exception("User Already registered");

                User newUser = new User
                {
                    Id = (Guid)(userAddDto.Id == null ? Guid.NewGuid() : userAddDto.Id),
                    Name = userAddDto.Name,
                    Email = userAddDto.Email.ToLower(),
                    IsActive = true, //Need to change false when going with actual implementation
                    Role = userAddDto.Role,
                    UserType = "Normal",
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = "Super Admin",
                    UpdatedDate = DateTime.MinValue,
                    UpdatedBy = ""
                };

                baseContext.Add(newUser);
                await SaveChanges();

                return newUser;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                var users = await baseContext.User.Where(x => x.IsActive == true).ToListAsync();
                return users;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            try
            {
                var user = await baseContext.User
                    .Include(x => x.MeetingsInvited)
                    .Include(x => x.JoinedInitiatives)
                    .Where(x => x.IsActive == true)
                    .Where(x => x.Email == email)
                    .FirstOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> HasUser(string email)
        {
            try
            {
                var user = await baseContext.User
                    .Where(x => x.IsActive == true)
                    .Where(x => x.Email == email)
                    .FirstOrDefaultAsync();

                if (user == null)
                    return false;

                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> RemoveUser(string email)
        {
            try
            {
                var user = await baseContext.User
                    .Where(x => x.Email == email)
                    .FirstOrDefaultAsync();

                if (user == null)
                    return false;

                baseContext.User.Remove(user);
                await SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> ChangeStatusOfUser(string email)
        {
            try
            {
                var user = await baseContext.User
                    .Where(x => x.Email == email)
                    .FirstOrDefaultAsync();

                if (user == null)
                    return false;

                user.IsActive = !user.IsActive;
                await SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> RemoveUserById(Guid userId)
        {
            try
            {
                var user = await baseContext.User
                    .Where(x => x.Id == userId)
                    .FirstOrDefaultAsync();

                if (user == null)
                    return false;

                baseContext.User.Remove(user);
                await SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<User> GetUserById(Guid userId)
        {
            try
            {
                var user = await baseContext.User
                    .Include(x => x.MeetingsInvited)
                    .Include(x => x.JoinedInitiatives)
                    .Where(x => x.Id == userId)
                    .FirstOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<User>> GetAllUsersWithInactive()
        {
            try
            {
                var users = await baseContext.User
                    .OrderByDescending(x => x.IsActive)
                    .ToListAsync();

                return users;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
        public async Task<bool> EditUserById(Guid userId, UserEditDto userEditDto)
        {
            try
            {
                var user = await baseContext.User.Where(x => x.Id == userId).FirstOrDefaultAsync();
                if (user == null)
                    return false;

                user.Name = userEditDto.Name;
                user.UserType = userEditDto.UserType;
                user.Role = userEditDto.Role;

                await SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
    }
}
