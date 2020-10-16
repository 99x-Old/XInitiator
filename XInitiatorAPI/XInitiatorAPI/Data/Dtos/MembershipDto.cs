using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XInitiatorAPI.Data.Dtos
{
    public class MembershipDto
    {
        public Guid InitiativeId { get; set; }
        public ICollection<Guid> Members { get; set; }
    }
}
