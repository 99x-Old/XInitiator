using System;
using System.Collections.Generic;
using XInitiatorAPI.Data.Models;
using Action = XInitiatorAPI.Data.Models.Action;

namespace XInitiatorAPI.Data.Dtos
{
    public class InitiativeByYearResultDto
    {
        public InitiativeByYear initiativeByYear { get; set; }
        public User Lead { get; set; }
    }
}
