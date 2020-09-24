using Api.Repository.Models.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Api.RepositoryCommon
{
    public class DbContextBase : DbContext
    {
        private int _transactionCount;

        public DbContextBase(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var prop in entity.GetProperties())
                {
                    var attr = prop.PropertyInfo.GetCustomAttribute<IndexAttribute>();
                    if (attr != null)
                    {
                        var index = entity.AddIndex(prop);
                        index.IsUnique = attr.IsUnique;
                        index.SqlServer().IsClustered = attr.IsClustered;
                    }
                }
            }

            base.OnModelCreating(modelBuilder);
        }

        public IDbContextTransaction BeginTransaction(IsolationLevel level)
        {
            ++_transactionCount;
            if (_transactionCount == 1 && Database.CurrentTransaction == null)
            {
                return Database.BeginTransaction(level);
            }

            return null;
        }

        public void UseTransaction(IDbContextTransaction transaction)
        {
            Database.UseTransaction(transaction.GetDbTransaction());
        }

        public void CommitTransaction()
        {
            if (_transactionCount > 0)
            {
                --_transactionCount;
            }
            if (_transactionCount == 0)
            {
                Database.CurrentTransaction?.Commit();
            }
        }

        public void RollbackTransaction()
        {
            if (_transactionCount > 0)
            {
                --_transactionCount;
            }
            if (_transactionCount == 0)
            {
                Database.CurrentTransaction?.Rollback();
            }
        }
    }

    public static class AppDbContextExtensions
    {
        public static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other, Func<T, TKey> getKeyFunc)
        {
            return from item in items
                   join otherItem in other on getKeyFunc(item)
                   equals getKeyFunc(otherItem) into tempItems
                   from temp in tempItems.DefaultIfEmpty()
                   where ReferenceEquals(null, temp) || temp.Equals(default(T))
                   select item;
        }
    }
}
