using Api.Common;
using Api.IRepository;
using Api.Repository.Models;
using Api.RepositoryCommon;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Mechanic
{
    class CarsRepository : GenericRepository<Cars>, ICarsRepository
    {
        public CarsRepository(AppDbContext appDbContext, IApiExecutionContext appEx)
            : base(appDbContext, appEx)
        {
        }
    }
}
