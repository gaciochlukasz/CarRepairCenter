using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Api.IRepositoryCommon
{
    public interface IUnitOfWorkBase
    {
        void Save();
        IDbContextTransaction BeginTransaction(IsolationLevel level = IsolationLevel.ReadUncommitted);
        void UseTransaction(IDbContextTransaction transaction);
        void RollbackTransaction();
        void CommitTransaction();

        void Dispose();

        string Text { set; get; }
    }
}
