using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Services.Initiatives;

namespace XInitiatorAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class InitiativesController : ControllerBase
    {
        public readonly IInitiativeService initiativeService;
        public readonly ILogger<InitiativesController> logger;

        public InitiativesController(IInitiativeService _initiativeService, ILogger<InitiativesController> _logger)
        {
            initiativeService = _initiativeService;
            logger = _logger;
        }

        [Description("Adding a new Initiative")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InitiativeDto initiativeDto)
        {
                if (initiativeDto == null)
                {
                    logger.LogError("Input object cannot be null");
                    return new BadRequestObjectResult(new { error = "Input object cannot be null" });
                }
                    
                if(String.IsNullOrEmpty(initiativeDto.Name)|| String.IsNullOrEmpty(initiativeDto.Description))
                {
                    logger.LogError("Some fields are null");
                    return new BadRequestObjectResult(new { error = "Some fields are null" });
                }

                try
                {
                    var result = await initiativeService.CreateNewInitiative(initiativeDto);
                    return Ok(result);
                }catch(Exception ex)
                {
                    logger.LogError(ex, ex.Message);
                    return BadRequest($"Module not saved, {ex.Message}");
                }
        }

        [Description("Get all Initiatives")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await initiativeService.GetAllIntiatives();
                return Ok(result);
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong!, {ex.Message}");
            }
        }

        [Description("Get a Initiative by Id")]
        [HttpGet("{initiaitveId}")]
        public async Task<IActionResult> GetById(string initiaitveId)
        {
            if (String.IsNullOrEmpty(initiaitveId))
            {
                logger.LogError("Parameter is empty");
                return new BadRequestObjectResult(new { error = "Parameters cannot be empty" });
            }

            try
            {
                var result = await initiativeService.GetInitiativeById(new Guid(initiaitveId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong!, {ex.Message}");
            }
        }

        [Description("Edit a Initiative")]
        [HttpPut("{initiaitveId}")]
        public async Task<IActionResult> Edit([FromRoute]string initiaitveId, [FromBody] InitiativeDto initiativeDto)
        {
            if (initiativeDto == null)
            {
                logger.LogError("Initiative Dto Object is empty");
                return new BadRequestObjectResult(new { error = "Initiative Dto Object cannot be null" });
            }

            if (String.IsNullOrEmpty(initiaitveId))
            {
                logger.LogError("Parameter is empty");
                return new BadRequestObjectResult(new { error = "Parameters cannot be empty" });
            }

            try
            {
                var result = await initiativeService.EditInitiative(new Guid(initiaitveId), initiativeDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong!, {ex.Message}");
            }
        }

        [Description("Delete a Initiative")]
        [HttpDelete("{initiaitveId}")]
        public async Task<IActionResult> Delete([FromRoute] string initiaitveId)
        {
            if (String.IsNullOrEmpty(initiaitveId))
            {
                logger.LogError("Parameter is empty");
                return new BadRequestObjectResult(new { error = "Parameters cannot be empty" });
            }

            try
            {
                var result = await initiativeService.DeleteInitiative(new Guid(initiaitveId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                return BadRequest($"Something went wrong!, {ex.Message}");
            }
        }
    }
}
