using Api.Common;
using Api.IRepositoryCommon;
using Api.Repository.Models.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Api.RepositoryCommon
{
    public abstract class UnitOfWorkBase : IDisposable, IUnitOfWorkBase
    {
        protected readonly DbContextBase appDbContext;
        protected readonly IApiExecutionContext appEx;

        public UnitOfWorkBase(DbContextBase appDbContext, IApiExecutionContext appEx)
        {
            this.appEx = appEx;
            this.appDbContext = appDbContext;
        }

        public string Text { set; get; }

        /// <summary>
        /// Could be used instead of SaveChanges in particular repos,
        /// But it's lightweight and usually shouldn't be chossen as a preffered way (last necessity!!!)
        /// </summary>
        public void Save()
        {
            try
            {
                BeginTransaction();
                appDbContext.SaveChanges();
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

                        outputLines.AppendLine($"DbUpdateConcurrencyException: Item \"{se.Entity.GetType().Name}\" Id= \"{model.Id} \",  ModifiedOnUtc= \"{model.Modified}\"");
                    }
                }

                // TODO: Later
                // LogMessageToFile("ConcurrencyException", outputLines.ToString());

                /* Log Inner Exception is not required because we know what error we have
                var innerException = e.InnerException;
                while (innerException != null)
                {
                    LogException(innerException);
                    innerException = innerException.InnerException;
                }*/

                throw;
            }
            catch (Exception ex)
            {
                RollbackTransaction();

                // LogException(ex);

                var lastInnerException = ex.InnerException;
                var innerException = ex.InnerException;
                while (innerException != null)
                {
                    // LogException(innerException);
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
                foreach (EntityEntry dbEntityEntry in appDbContext.ChangeTracker.Entries())
                {
                    if (dbEntityEntry.Entity != null)
                    {
                        dbEntityEntry.State = EntityState.Detached;
                    }
                }
            }
        }

        protected abstract void InitDbContext();

        public IDbContextTransaction BeginTransaction(IsolationLevel level = IsolationLevel.ReadUncommitted)// Snapshot
        {
            if (appDbContext == null)
            {
                InitDbContext();
            }
            return appDbContext?.BeginTransaction(level);
        }

        public void UseTransaction(IDbContextTransaction transaction)
        {
            if (appDbContext == null)
            {
                InitDbContext();
            }

            appDbContext?.UseTransaction(transaction);
        }

        public void RollbackTransaction()
        {
            appDbContext?.RollbackTransaction();
        }

        public void CommitTransaction()
        {
            appDbContext?.CommitTransaction();
        }

        private bool _disposed = false;
        

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    appDbContext.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
