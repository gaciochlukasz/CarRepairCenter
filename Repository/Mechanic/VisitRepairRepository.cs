using Api.Common;
using Api.IRepository;
using Api.Repository.Models;
using Api.RepositoryCommon;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Mechanic
{
    class VisitRepairRepository : GenericRepository<VisitRepair>, IVisitRepairRepository
    {
        public VisitRepairRepository(AppDbContext appDbContext, IApiExecutionContext appEx)
            : base(appDbContext, appEx)
        {
        }
    }
}
