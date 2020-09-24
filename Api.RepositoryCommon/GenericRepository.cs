using Api.Common;
using Api.IRepositoryCommon;
using Api.Repository.Models;
using Api.Repository.Models.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Api.RepositoryCommon
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity
        : class, IEntity, new()
    {
        protected readonly DbContextBase _appDbContext;
        private readonly IApiExecutionContext _appEx;
        internal DbSet<TEntity> _dbSet;


        public GenericRepository(DbContextBase appDbContext, IApiExecutionContext appEx)
        {
            _appEx = appEx;
            _appDbContext = appDbContext;
            _dbSet = _appDbContext.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> GetAll(bool garageContext = true)
        {
            var queryable = _dbSet.AsNoTracking();
            if (garageContext)
            {
                var garageId = _appEx.GarageId;
                queryable = queryable.Where(x => x.GarageContextId == garageId);
            }

            return queryable;
        }

        public virtual TEntity GetById(long id, bool garageContext = true)
        {
            return GetAll(garageContext).FirstOrDefault(x => x.Id == id);
        }
        public virtual long Create(TEntity entity, bool garageContext = true)
        {
            if (entity == null)
                throw new ArgumentNullException("entity");

            long returnId = -1;

            entity.ModifiedBy = 1;
            entity.CreatedBy = 1;

            entity.Modified = DateTime.UtcNow;
            entity.Created = DateTime.UtcNow;
            if (garageContext)
            {
                entity.GarageContextId = _appEx.GarageId;
            }

            _dbSet.Add(entity);

            try
            {
                SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (!(entity == null))
                    returnId = entity.Id;
            }

            return returnId;
        }


        public virtual void Delete(TEntity entityToDelete)
        {
            if (entityToDelete == null)
            {
                throw new ArgumentNullException("entityToUpdate");
            }

            if (_appDbContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbSet.Attach(entityToDelete);
            }

            _dbSet.Remove(entityToDelete);
            _appDbContext.SaveChanges();

        }

        public void Delete(IEnumerable<TEntity> entitiesToDelete)
        {
            foreach (var item in entitiesToDelete)
                Delete(item);

            _appDbContext.SaveChanges();
        }

        public virtual void Update(TEntity entityToUpdate, bool garageContextId = true)
        {
            if (entityToUpdate == null)
            {
                throw new ArgumentNullException("entityToUpdate");
            }

            TEntity entity = null;
            try
            {
                entity = GetById(entityToUpdate.Id, garageContextId);

                if (entity == null)
                {
                    throw new ArgumentNullException("Missing entity");
                }

                entityToUpdate.Modified = DateTime.UtcNow;

                var entry = _appDbContext.Entry(entity);
                entry.CurrentValues.SetValues(entityToUpdate);
                entry.State = EntityState.Modified;

                entry.Property(o => o.Created).IsModified = false;
                entity.Modified = DateTime.UtcNow;
                entity.ModifiedBy = 1;

            }
            catch (UnauthorizedAccessException ex)
            {
                RollbackTransaction();
                throw ex;
            }
            // W przypadku kiedy entity jest już dołączone, trzeba zmeinic jego wartosc inaczej. Np. w sytuacji kiedy w jednej transakcji encja jest najpierw dodawana, a potem zmieniana.
            catch (Exception ex)
            {
                RollbackTransaction();
                throw ex;
            }
            try
            {
                SaveChanges();
            }
            finally
            {
                _appDbContext.Entry(entity).State = EntityState.Detached;
            }

        }

        public void Update(IEnumerable<TEntity> entitiesToUpdate, bool garageContext = true)
        {
            try
            {
                foreach (var entity in entitiesToUpdate)
                {
                    entity.Modified = DateTime.UtcNow;
                    if (garageContext)
                    {
                        entity.GarageContextId = _appEx.GarageId;
                    }
                    _dbSet.Update(entity);
                }
                SaveChanges();
            }
            catch (UnauthorizedAccessException ex)
            {
                RollbackTransaction();
                throw ex;
            }
            catch (Exception ex)
            {
                RollbackTransaction();
                throw ex;
            }
        }
        public void SaveChanges()
        {
            try
            {
                BeginTransaction();
                _appDbContext.SaveChanges();
                CommitTransaction();
            }
            catch (DbUpdateConcurrencyException e)
            {
                RollbackTransaction();

                StringBuilder outputLines = new StringBuilder();
                if (e.Entries != null)
                {
                    foreach (var se in e.Entries)
                    {
                        BaseModel model = se.Entity as BaseModel;

                        outputLines.AppendLine(
                            $"DbUpdateConcurrencyException: Item \"{se.Entity.GetType().Name}\" Id= \"{model.Id} \",  ModifiedOnUtc= \"{model.Modified}\"");
                    }
                }

                throw;
            }
            catch (Exception ex)
            {
                RollbackTransaction();

                var lastInnerException = ex.InnerException;
                var innerException = ex.InnerException;
                while (innerException != null)
                {
                    lastInnerException = innerException;
                    innerException = innerException.InnerException;
                }

                if (lastInnerException is SqlException)
                {
                    throw lastInnerException;
                }

                throw;
            }
            finally
            {
                var tempList = _appDbContext.ChangeTracker.Entries().ToList();
                foreach (EntityEntry dbEntityEntry in tempList)
                {
                    if (dbEntityEntry.Entity != null)
                    {
                        dbEntityEntry.State = EntityState.Detached;
                    }
                }
            }
        }
        private async Task SaveChangesAsync()
        {
            try
            {
                BeginTransaction();
                await _appDbContext.SaveChangesAsync();
                CommitTransaction();
            }
            catch (DbUpdateConcurrencyException e)
            {
                RollbackTransaction();

                StringBuilder outputLines = new StringBuilder();
                if (e.Entries != null)
                {
                    foreach (var se in e.Entries)
                    {
                        BaseModel model = se.Entity as BaseModel;

                        outputLines.AppendLine(
                            $"DbUpdateConcurrencyException: Item \"{se.Entity.GetType().Name}\" Id= \"{model.Id} \",  ModifiedOnUtc= \"{model.Modified}\"");
                    }
                }

                throw;
            }
            catch (Exception ex)
            {
                RollbackTransaction();

                var lastInnerException = ex.InnerException;
                var innerException = ex.InnerException;
                while (innerException != null)
                {
                    lastInnerException = innerException;
                    innerException = innerException.InnerException;
                }

                if (lastInnerException is SqlException)
                {
                    throw lastInnerException;
                }

                throw;
            }
            finally
            {
                var tempList = _appDbContext.ChangeTracker.Entries().ToList();
                foreach (EntityEntry dbEntityEntry in tempList)
                {
                    if (dbEntityEntry.Entity != null)
                    {
                        dbEntityEntry.State = EntityState.Detached;
                    }
                }
            }
        }

        #region Transaction

        private void InitDbContext()
        {
            // Ustawienie CommandTimeout na 2 minuty
            _appDbContext.Database.SetCommandTimeout(120);
        }

        public void BeginTransaction(IsolationLevel level = IsolationLevel.ReadUncommitted) // Snapshot
        {
            if (_appDbContext == null)
            {
                InitDbContext();
            }

            _appDbContext?.BeginTransaction(level);
        }

        public void RollbackTransaction()
        {
            _appDbContext?.RollbackTransaction();
        }

        public void CommitTransaction()
        {
            _appDbContext?.CommitTransaction();
        }

        #endregion
    }
}