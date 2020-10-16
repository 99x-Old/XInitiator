using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XInitiatorAPI.Data.Dtos
{
    public class UserAddDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
