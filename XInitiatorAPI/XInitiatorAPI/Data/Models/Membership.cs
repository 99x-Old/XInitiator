using System;

namespace XInitiatorAPI.Data.Models
{
    public class Membership: Audit
    {
        public Guid Id { get; set; }
        public int OverallRating { get; set; }
        public string Role { get; set; }
        public Guid UserId { get; set; }
        public Guid InitiativeByYearId { get; set; }

        public virtual User User { get; set; }
        public virtual InitiativeByYear Initiative { get; set; }

    }
}
