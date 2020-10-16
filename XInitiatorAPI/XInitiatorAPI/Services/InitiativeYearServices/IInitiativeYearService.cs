using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.InitiativeYearService
{
    public interface IInitiativeYearService
    {
        public Task<InitiativeYear> CreateInitiativeYear(InitiativeYearDto initiativeYearDto);
        public Task<List<InitiativeYear>> GetAllInitiativeYears();
        public Task<bool> YearCompleted(string year);
        public Task<bool> AddCommentOnYear(InitiativeYearDto comment);
        public Task<bool> ChangeReviewStatus(string year);
    }
}
