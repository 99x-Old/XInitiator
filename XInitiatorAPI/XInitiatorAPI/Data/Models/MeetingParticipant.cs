using System;

namespace XInitiatorAPI.Data.Models
{
    public class MeetingParticipant: Audit
    {
        public int Id { get; set; }
        public bool IsAccepted { get; set; }
        public bool IsParticipated { get; set; }
        public Guid MeetingId { get; set; }
        public Guid UserId { get; set; }

        public Meeting Meeting { get; set; }
        public User User { get; set; }
    }
}
