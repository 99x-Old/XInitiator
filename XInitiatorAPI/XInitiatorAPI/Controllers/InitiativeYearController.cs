using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Services.InitiativeYearService;

namespace XInitiatorAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InitiativeYearController : ControllerBase
    {
        public readonly IInitiativeYearService initiativeYearService;
        public readonly ILogger<InitiativeYearController> logger;

        public InitiativeYearController(IInitiativeYearService _initiativeYearService, ILogger<InitiativeYearController> _logger)
        {
            initiativeYearService = _initiativeYearService;
            logger = _logger;
        }

        [Description("Creating a new Initiative Year")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InitiativeYearDto initiativeYearDto)
        {
            if (String.IsNullOrEmpty(initiativeYearDto.Year))
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }
            if (initiativeYearDto == null)
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }

            try
            {
                var result = await initiativeYearService.CreateInitiativeYear(initiativeYearDto);
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something wend Wrong, {ex.Message}");
            }
        }

        [Description("Add A comment for the Initiative Year")]
        [HttpPut]
        public async Task<IActionResult> AddComment([FromBody] InitiativeYearDto initiativeYearDto)
        {
            if (String.IsNullOrEmpty(initiativeYearDto.Year) && String.IsNullOrEmpty(initiativeYearDto.Comment))
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }

            if (initiativeYearDto == null)
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }

            try
            {
                var result = await initiativeYearService.AddCommentOnYear(initiativeYearDto);
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something wend Wrong, {ex.Message}");
            }
        }

        [Description("Get All Years")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await initiativeYearService.GetAllInitiativeYears();
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something wend Wrong, {ex.Message}");
            }
        }

        [Description("Change Review Status")]
        [HttpGet("review/{year}")]
        public async Task<IActionResult> ChangeReviewStatus([FromRoute] string year)
        {
            if (String.IsNullOrEmpty(year))
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }

            try
            {
                var result = await initiativeYearService.ChangeReviewStatus(year);
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something wend Wrong, {ex.Message}");
            }
        }

        [Description("Change Completed Status")]
        [HttpGet("complete/{year}")]
        public async Task<IActionResult> ChangeCompleteStatus([FromRoute] string year)
        {
            if (String.IsNullOrEmpty(year))
            {
                logger.LogError($"Bad Request Object");
                return BadRequest("Request Object Invalid");
            }

            try
            {
                var result = await initiativeYearService.YearCompleted(year);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something wend Wrong, {ex.Message}");
            }
        }
    }
}
