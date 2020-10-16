using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;
using XInitiatorAPI.Services.Initiatives;

namespace XInitiatorAPI.Services.InitiativesByYear
{
    public class InitiativesByYearService : BaseService, IInititiativesByYearService
    {

        private ILogger<InitiativesByYearService> logger;

        public InitiativesByYearService(BaseContext baseContext, ILogger<InitiativesByYearService> _logger) : base(baseContext)
        {
            logger = _logger;
        }

        public async Task<InitiativeByYear> Add(InitiativeByYearDto initiativeByYearDto)
        {
            try
            {
                var initiative = await baseContext.Initiatives.Where(x => x.Id == initiativeByYearDto.InitiativeId).FirstOrDefaultAsync();

                if (initiative == null)
                    return null;

                var initiativeByYear = new InitiativeByYear {
                    Id = Guid.NewGuid(),
                    Name = $"{initiative.Name} - {initiativeByYearDto.Year}",
                    InitiativeYearId = initiativeByYearDto.Year,
                    InitiativeId = initiativeByYearDto.InitiativeId,
                    LeadId = initiativeByYearDto.LeadId,
                    CreatedBy = "Super Admin",
                    CreatedDate = DateTime.UtcNow
                };

                baseContext.Add(initiativeByYear);
                await SaveChanges();

                return initiativeByYear;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<InitiativeByYear> Edit(Guid initiativeId, InitiativeByYearDto initiativeByYearDto)
        {
            try
            {
                var initiative = await baseContext.InitiativesByYears.Where(x => x.Id == initiativeId).FirstOrDefaultAsync();

                if (initiative == null)
                    return null;

                if (!String.IsNullOrEmpty(initiativeByYearDto.Year)) initiative.InitiativeYearId = initiativeByYearDto.Year;
                if (!(initiativeByYearDto.LeadId == Guid.Empty)) initiative.LeadId = initiativeByYearDto.LeadId;

                initiative.UpdatedBy = "Super User";
                initiative.UpdatedDate = DateTime.UtcNow;

                await SaveChanges();

                return initiative;
            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<InitiativeByYearResultDto>> GetAll(string year)
        {
            try
            {
                List<InitiativeByYearResultDto> list = new List<InitiativeByYearResultDto>();

                var allInitiatives = await baseContext.InitiativesByYears
                    .Include(a => a.Initiative)
                    .Where(x => x.InitiativeYearId == year)
                    .ToListAsync();

                foreach(var initiative in allInitiatives)
                {
                    var lead = await baseContext.User.Where(x => x.Id == initiative.LeadId).FirstOrDefaultAsync();

                    InitiativeByYearResultDto result = new InitiativeByYearResultDto
                    {
                        initiativeByYear = initiative,
                        Lead = lead
                    };

                    list.Add(result);

                }
                return list;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<InitiativeByYearResultDto> GetById(Guid initiativeId)
        {
            try
            {
                var initiative = await baseContext.InitiativesByYears
                    .Include(a => a.Initiative)
                    .Where(x => x.Id == initiativeId)
                    .FirstOrDefaultAsync();

                var lead = await baseContext.User.Where(x => x.Id == initiative.LeadId).FirstOrDefaultAsync();

                var initiativeLead = new InitiativeByYearResultDto
                {
                    initiativeByYear = initiative,
                    Lead = lead

                };

                return initiativeLead;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<List<InitiativeByYearResultDto>> GetInitiativeByYearByLeadId(Guid leadId)
        {
            try
            {
                

                List<InitiativeByYearResultDto> list = new List<InitiativeByYearResultDto>();

                var initiativesList = await baseContext.InitiativesByYears
                    .Include(a => a.Initiative)
                    .Where(x => x.LeadId == leadId).ToListAsync();

                foreach (var initiative in initiativesList)
                {
                    var lead = await baseContext.User.Where(x => x.Id == initiative.LeadId).FirstOrDefaultAsync();

                    InitiativeByYearResultDto result = new InitiativeByYearResultDto
                    {
                        initiativeByYear = initiative,
                        Lead = lead
                    };

                    list.Add(result);

                }
                return list;
            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> Remove(Guid initiativeId)
        {
            try
            {
                var initiative = await baseContext.InitiativesByYears.Where(x => x.Id == initiativeId).FirstOrDefaultAsync();
                if (initiative == null)
                    return false;

                baseContext.InitiativesByYears.Remove(initiative);
                await SaveChanges();
                return true;

            }catch(Exception ex)
            {
                logger.LogDebug(ex, ex.Message);
                throw ex;
            }
        }
    }
}
