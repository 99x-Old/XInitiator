using System;
using System.Collections.Generic;

namespace XInitiatorAPI.Data.Models
{
    public class Meeting: Audit
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsOnline { get; set; }
        public string MeetingRoom { get; set; }
        public DateTime ScheduledDate { get; set; }
        public int Status { get; set; }
        public bool IsActive { get; set; }
        public string TimeLogging { get; set; }
        public string MeetingLink { get; set; }
        public Guid OrganizerId { get; set; }
        public Guid InitiativeByYearId { get; set; }

        public virtual ICollection<Note> MeetingNotes { get; set; }
        public virtual ICollection<MeetingParticipant> MeetingParticipants { get; set; }

    }
}
