using System;

namespace XInitiatorAPI.Data.Models
{
    public class Note: Audit
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime OpenedDate { get; set; }
        public DateTime LastEditedDate { get; set; }
        public Guid OpenedBy { get; set; }
        public Guid MeetingId { get; set; }

        public virtual Meeting Meeting { get; set; }
    }
}
