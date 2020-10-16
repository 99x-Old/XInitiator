using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Services.MembershipServices;

namespace XInitiatorAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MembershipController : ControllerBase
    {
        public readonly IMembershipService _membershipService;
        public readonly ILogger<MembershipController> logger;

        public MembershipController(IMembershipService membershipService, ILogger<MembershipController> _logger)
        {
            _membershipService = membershipService;
            logger = _logger;
        }

        [Description("Adding a Members to the Initiative")]
        [HttpPost]
        public async Task<IActionResult> AddMembers([FromBody]MembershipDto membershipDto)
        {
            if(membershipDto.InitiativeId == Guid.Empty)
            {
                logger.LogError("Initiative ID not valid");
                return BadRequest("Initiative ID not valid");
            }

            try
            {
                var result = await _membershipService.AddMembership(membershipDto);
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Get Members of Initiative")]
        [HttpGet("initiative/{initiativeId}")]
        public async Task<IActionResult> GetAll(string initiativeId)
        {

            try
            {
                var result = await _membershipService.GetAllMembersInInitiative(new Guid(initiativeId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong, {ex.Message}");
            }
        }

        [Description("Remove Member from Initiative")]
        [HttpDelete("initiative/{initiativeId}/user/{userId}")]
        public async Task<IActionResult> RemoveMember([FromRoute]string initiativeId, string userId)
        {

            try
            {
                var result = await _membershipService.RemoveMemberFromInitiative(new Guid(initiativeId), new Guid(userId));
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
