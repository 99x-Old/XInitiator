using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.Initiatives
{
    public class InitiativeService : BaseService, IInitiativeService
    {

        private ILogger<InitiativeService> logger;

        public InitiativeService(BaseContext baseContext, ILogger<InitiativeService> _logger): base(baseContext)
        {
            logger = _logger;
        }

        public async Task<Initiative> CreateNewInitiative(InitiativeDto initiativeDto)
        {
            try
            {
                var initiative = new Initiative
                {
                    Id = Guid.NewGuid(),
                    Name = initiativeDto.Name,
                    Description = initiativeDto.Description,
                    CreatedBy = "Super User",
                    CreatedDate = DateTime.UtcNow,
                    UpdatedBy = "",
                    UpdatedDate = DateTime.MinValue
                };

                baseContext.Add(initiative);

                await SaveChanges();

                return initiative;
            }catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw;
            }
        }

        public async Task<bool> DeleteInitiative(Guid initiativeId)
        {
            try
            {
                var initiative = baseContext.Initiatives.FirstOrDefault(a => a.Id == initiativeId);
                baseContext.Initiatives.Remove(initiative);
                await SaveChanges();
                return true;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw;
            }
        }

        public async Task<Initiative> EditInitiative(Guid initiativeId, InitiativeDto initiativeDto)
        {
            try {
                var initiative = await baseContext.Initiatives.Where(x => x.Id == initiativeId).FirstOrDefaultAsync();

                if (!String.IsNullOrEmpty(initiativeDto.Name)) initiative.Name = initiativeDto.Name;
                if (!String.IsNullOrEmpty(initiativeDto.Description)) initiative.Description = initiativeDto.Description;
                initiative.UpdatedBy = "Super User";
                initiative.UpdatedDate = DateTime.UtcNow;

                await SaveChanges();

                return initiative;
            }
            catch(Exception e)
            {
                logger.LogError(e, e.Message);
                throw;
            }
        }

        public async Task<List<Initiative>> GetAllIntiatives()
        {
            try
            {
                return await baseContext.Initiatives.ToListAsync();
            }catch(Exception e)
            {
                logger.LogError(e, e.Message);
                throw;
            }

        }

        public async Task<Initiative> GetInitiativeById(Guid initiativeId)
        {
            try
            {
                return await baseContext.Initiatives
                    .Where(x => x.Id == initiativeId)
                    .FirstOrDefaultAsync();
            }catch(Exception e)
            {
                logger.LogError(e, e.Message);
                throw;
            }
        }
    }
}
