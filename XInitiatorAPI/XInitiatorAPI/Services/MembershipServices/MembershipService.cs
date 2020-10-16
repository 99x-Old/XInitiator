using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.MembershipServices
{
    public class MembershipService: BaseService, IMembershipService
    {
        private ILogger<MembershipService> logger;

        public MembershipService(BaseContext baseContext, ILogger<MembershipService> _logger) : base(baseContext)
        {
            logger = _logger;
        }

        public async Task<bool> AddMembership(MembershipDto membershipDto)
        {
            try
            {
                foreach (var member in membershipDto.Members)
                {
                    var isMember = await baseContext.Memberships
                        .Where(x => x.InitiativeByYearId == membershipDto.InitiativeId)
                        .Where(x => x.UserId == member).FirstOrDefaultAsync();

                    if (isMember == null)
                    {
                        Membership membership = new Membership
                        {
                            Id = Guid.NewGuid(),
                            OverallRating = 0,
                            Role = "Member",
                            UserId = member,
                            InitiativeByYearId = membershipDto.InitiativeId,
                            CreatedBy = "Super Admin",
                            CreatedDate = DateTime.UtcNow
                        };

                        baseContext.Add(membership);
                        await SaveChanges();
                    }
                }

                return true;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<Membership>> GetAllMembersInInitiative(Guid initiativeId)
        {
            try
            {
                var result = await baseContext.Memberships
                    .Include(a => a.User)
                    .Where(x => x.InitiativeByYearId == initiativeId)
                    .ToListAsync();

                return result;
                    

            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> RemoveMemberFromInitiative(Guid initiativeId, Guid userId)
        {
            try
            {
                var member = baseContext.Memberships
                    .Where(x => x.InitiativeByYearId == initiativeId)
                    .Where(x => x.UserId == userId).FirstOrDefault();

                baseContext.Memberships.Remove(member);
                await SaveChanges();
                return true;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
    }
}
