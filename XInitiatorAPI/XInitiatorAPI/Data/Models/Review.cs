using System;

namespace XInitiatorAPI.Data.Models
{
    public class Review: Audit
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int InitiativeScore { get; set; }
        public DateTime ReviewedDate { get; set; }
        public bool IsValidated { get; set; }
        public Guid ReviewerId { get; set; }
        public Guid ReviewCycleId { get; set; }

        public virtual ReviewCycle ReviewCycle { get; set; }
        public virtual User Reviewer { get; set; }
    }
}
