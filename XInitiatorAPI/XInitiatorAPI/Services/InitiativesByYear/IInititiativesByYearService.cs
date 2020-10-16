using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services
{
    public interface IInititiativesByYearService
    {
        public Task<List<InitiativeByYearResultDto>> GetAll(string year);
        public Task<InitiativeByYearResultDto> GetById(Guid initiativeId);
        public Task<InitiativeByYear> Add(InitiativeByYearDto initiativeByYearDto);
        public Task<InitiativeByYear> Edit(Guid initiativeId, InitiativeByYearDto initiativeByYearDto);
        public Task<bool> Remove(Guid initiativeId);
        public Task<List<InitiativeByYearResultDto>> GetInitiativeByYearByLeadId(Guid leadId);

    }
}
