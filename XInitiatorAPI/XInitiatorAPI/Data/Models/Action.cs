using System;
using System.Collections.Generic;

namespace XInitiatorAPI.Data.Models
{
    public class Action: Audit
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public DateTime DeadLine { get; set; }
        public int Progress { get; set; }
        public Guid InitiativeByYearId { get; set; }

        public virtual InitiativeByYear InitiativeByYear { get; set; }

        public virtual ICollection<ActionAssignment> AssignedUsers { get; set; }
    }
}
