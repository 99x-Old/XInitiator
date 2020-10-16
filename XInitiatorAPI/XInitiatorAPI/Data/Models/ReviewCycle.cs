using System;

namespace XInitiatorAPI.Data.Models
{
    public class ReviewCycle: Audit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
    }
}
