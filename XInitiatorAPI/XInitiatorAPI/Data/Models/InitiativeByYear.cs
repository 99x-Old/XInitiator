using System;
using System.Collections.Generic;

namespace XInitiatorAPI.Data.Models
{
    public class InitiativeByYear: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string InitiativeYearId { get; set; }
        public Guid InitiativeId { get; set; }
        public Guid? LeadId { get; set; }
        public string? LeadName { get; set; }
        public Initiative Initiative { get; set; }

        public ICollection<Action> InitiativeActions { get; set; }
    }
}
