using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XInitiatorAPI.Data.Dtos
{
    public class InitiativeByYearDto
    {
        public string Year { get; set; }
        public Guid InitiativeId { get; set; }
        public Guid? LeadId { get; set; }
    }
}
