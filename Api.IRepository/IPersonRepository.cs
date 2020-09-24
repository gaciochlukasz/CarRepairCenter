using Api.IRepositoryCommon;
using Api.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.IRepository
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
    }
}
