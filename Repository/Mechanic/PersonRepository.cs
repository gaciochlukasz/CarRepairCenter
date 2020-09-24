using Api.Common;
using Api.IRepository;
using Api.Repository.Models;
using Api.RepositoryCommon;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Mechanic
{
    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(AppDbContext appDbContext, IApiExecutionContext appEx)
            : base(appDbContext, appEx)
        {
        }
    }
}
