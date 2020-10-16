using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Data;

namespace XInitiatorAPI.Services
{
    public class BaseService
    {

        public readonly BaseContext baseContext;

        public BaseService(BaseContext _baseContext)
        {
            baseContext = _baseContext;
        }

        public Task SaveChanges()
        {
            return baseContext.SaveChangesAsync();
        }


    }
}
