using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Services;

namespace XInitiatorAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InitiativeByYearController : ControllerBase
    {
        public readonly IInititiativesByYearService inititiativesByYearService;
        public readonly ILogger<InitiativeByYearController> logger;

        public InitiativeByYearController(IInititiativesByYearService _inititiativesByYearService, ILogger<InitiativeByYearController> _logger)
        {
            inititiativesByYearService = _inititiativesByYearService;
            logger = _logger;
        }

        [Description("Adding a new Initiative for the Year")]
        [HttpPost]
        public async Task<IActionResult> Post(InitiativeByYearDto initiativeByYearDto)
        {

            if (initiativeByYearDto == null)
            {
                logger.LogError("Input object cannot be null");
                return new BadRequestObjectResult(new { error = "Input object cannot be null" });
            }

            if (String.IsNullOrEmpty(initiativeByYearDto.Year) || initiativeByYearDto.InitiativeId == Guid.Empty)
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            try
            {
                var result = await inititiativesByYearService.Add(initiativeByYearDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }

        [Description("Get all the initiatives for Year")]
        [HttpGet("year/{year}")]
        public async Task<IActionResult> GetAll(string year)
        {
            if (String.IsNullOrEmpty(year))
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            try
            {
                var result = await inititiativesByYearService.GetAll(year);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }

        [Description("Get Initiative for Year by Id")]
        [HttpGet("{initiativeId}")]
        public async Task<IActionResult> GetbyId(string initiativeId)
        {
            if (String.IsNullOrEmpty(initiativeId))
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            try
            {
                var result = await inititiativesByYearService.GetById(new Guid(initiativeId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }

        [Description("Get Initiative for Year by Lead")]
        [HttpGet("/lead/{leadId}")]
        public async Task<IActionResult> GetByLead(string leadId)
        {
            if (String.IsNullOrEmpty(leadId))
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            try
            {
                var result = await inititiativesByYearService.GetInitiativeByYearByLeadId(new Guid(leadId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }

        [Description("Edit Initiative for Year")]
        [HttpPut("{initiativeId}")]
        public async Task<IActionResult> Put([FromRoute]string initiativeId, [FromBody] InitiativeByYearDto initiativeByYearDto)
        {
            if (String.IsNullOrEmpty(initiativeId))
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            if (initiativeByYearDto == null)
            {
                logger.LogError("Input object cannot be null");
                return new BadRequestObjectResult(new { error = "Input object cannot be null" });
            }

            try
            {
                var result = await inititiativesByYearService.Edit(new Guid(initiativeId), initiativeByYearDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }

        [Description("Delete Initiative for Year")]
        [HttpDelete("{initiativeId}")]
        public async Task<IActionResult> Delete(string initiativeId)
        {
            if (String.IsNullOrEmpty(initiativeId))
            {
                logger.LogError("Some fields are null");
                return new BadRequestObjectResult(new { error = "Some fields are null" });
            }

            try
            {
                var result = await inititiativesByYearService.Remove(new Guid(initiativeId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Module not saved, {ex.Message}");
            }
        }
    }
}
