using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.MembershipServices
{
    public interface IMembershipService
    {
        public Task<bool> AddMembership(MembershipDto membershipDto);
        public Task<List<Membership>> GetAllMembersInInitiative(Guid initiativeId);
        public Task<bool> RemoveMemberFromInitiative(Guid initiativeId, Guid userId);
    }
}
