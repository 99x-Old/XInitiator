using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XInitiatorAPI.Data.Models
{
    public class InitiativeYear: Audit
    {
        public Guid Id { get; set; }
        public string Year { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsReviewd { get; set; }
        public string Comment { get; set; }
    }
}
