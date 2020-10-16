using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Services.Initiatives
{
    public interface IInitiativeService
    {
        public Task<Initiative> CreateNewInitiative(InitiativeDto initiativeDto);
        public Task<List<Initiative>> GetAllIntiatives();
        public Task<Initiative> GetInitiativeById(Guid initiativeId);
        public Task<Initiative> EditInitiative(Guid initiativeId, InitiativeDto initiativeDto);
        public Task<bool> DeleteInitiative(Guid initiativeId);
    }
}
