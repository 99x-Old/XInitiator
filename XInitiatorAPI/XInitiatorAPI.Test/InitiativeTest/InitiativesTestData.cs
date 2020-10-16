using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Test.InitiativeTest
{
    public class InitiativesTestData
    {
        public Initiative getTestInitiative()
        {
            var initiative = new Initiative
            {
                Id = Guid.NewGuid(),
                Name = "Test",
                Description = "Test",
                CreatedDate = DateTime.UtcNow,
                CreatedBy = "Tester"
            };

            return initiative;
        }

        public List<Initiative> getTestInitiativeList()
        {
            var initiativesList = new List<Initiative>();

            for(int i = 0; i < 3; i++)
            {
                initiativesList.Add(new Initiative
                {
                    Id = Guid.NewGuid(),
                    Name = $"Test {i}",
                    Description = $"Test {i} Test",
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = "Tester"
                });
            }

            return initiativesList;
        }
    }
}
