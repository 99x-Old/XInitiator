using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using XInitiatorAPI.Data;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;
using XInitiatorAPI.Services.Initiatives;
using XInitiatorAPI.Services.InitiativeYearService;

namespace XInitiatorAPI.Services.InitiativeYearServices
{
    public class InitiativeYearService : BaseService, IInitiativeYearService
    {

        private ILogger<InitiativeYearService> logger;

        public InitiativeYearService(BaseContext baseContext, ILogger<InitiativeYearService> _logger) : base(baseContext)
        {
            logger = _logger;
        }

        public async Task<bool> AddCommentOnYear(InitiativeYearDto comment)
        {
            try
            {
                var inititive = await baseContext.InitiativeYears.Where(x => x.Year == comment.Year).FirstOrDefaultAsync();

                if (inititive == null)
                    return false;

                inititive.Comment = comment.Comment;
                await SaveChanges();
                return true;
            }catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> ChangeReviewStatus(string year)
        {
            try
            {
                var initiative = await baseContext.InitiativeYears.Where(x => x.Year == year).FirstOrDefaultAsync();
                if (initiative == null)
                    return false;

                initiative.IsReviewd = !initiative.IsReviewd;

                await SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<InitiativeYear> CreateInitiativeYear(InitiativeYearDto initiativeYearDto)
        {
            try
            {
                var initiativeYear = new InitiativeYear
                {
                    Year = initiativeYearDto.Year,
                    Comment = String.IsNullOrEmpty(initiativeYearDto.Comment) ? "" : initiativeYearDto.Comment,
                    IsCompleted = false,
                    IsReviewd = false,
                    CreatedBy = "Super Admin",
                    CreatedDate = DateTime.UtcNow,
                    UpdatedBy = "",
                    UpdatedDate = DateTime.MinValue
                };

                baseContext.Add(initiativeYear);

                await SaveChanges();

                return initiativeYear;
            }catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }

        }

        public async Task<List<InitiativeYear>> GetAllInitiativeYears()
        {
            try
            {
                var initiativesYearList = await baseContext.InitiativeYears.ToListAsync();
                return initiativesYearList;
            }catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }

        public async Task<bool> YearCompleted(string year)
        {
            try
            {
                var initiative = await baseContext.InitiativeYears.Where(x => x.Year == year).FirstOrDefaultAsync();
                if (initiative == null)
                    return false;

                initiative.IsCompleted = !initiative.IsCompleted;
                await SaveChanges();

                return true;
            }catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                throw ex;
            }
        }
    }
}
