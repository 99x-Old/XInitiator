using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.UserServices
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsers();
        public Task<User> AddUser(UserAddDto userAddDto);
        public Task<bool> HasUser(string email);
        public Task<User> GetUserByEmail(string email);
        public Task<User> GetUserById(Guid userId);
        public Task<bool> RemoveUser(string email);
        public Task<bool> ChangeStatusOfUser(string email);
        public Task<bool> RemoveUserById(Guid userId);
        public Task<List<User>> GetAllUsersWithInactive();
        public Task<bool> EditUserById(Guid userId, UserEditDto userEditDto);
    }
}
