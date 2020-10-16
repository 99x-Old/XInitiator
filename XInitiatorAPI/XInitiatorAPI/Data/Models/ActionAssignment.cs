using System;

namespace XInitiatorAPI.Data.Models
{
    public class ActionAssignment: Audit
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ActionId { get; set; }

        public virtual Action Action { get; set; }
        public virtual User User { get; set; }
    }
}
