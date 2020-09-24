using Api.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Api.IRepositoryCommon
{
    public interface IGenericRepository<TEntity> where TEntity : class, IEntity, new()
    {
        IQueryable<TEntity> GetAll(bool garageContext = true);
        TEntity GetById(long id, bool garageContextId = true);
        
        long Create(TEntity entity, bool garageContextId = true);
        
        void Delete(TEntity entityToDelete);
        void Delete(IEnumerable<TEntity> entitiesToDelete);

        void Update(TEntity entityToUpdate, bool garageContextId = true);
        void Update(IEnumerable<TEntity> entitiesToUpdate, bool garageContextId = true);

        void SaveChanges();
    }
}
