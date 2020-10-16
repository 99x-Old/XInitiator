using System;
using System.Collections.Generic;

namespace XInitiatorAPI.Data.Models
{
    public class User: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }
        public string Role { get; set; }

        public virtual ICollection<Membership> JoinedInitiatives { get; set; }
        public virtual ICollection<MeetingParticipant> MeetingsInvited { get; set; }
    }
}
