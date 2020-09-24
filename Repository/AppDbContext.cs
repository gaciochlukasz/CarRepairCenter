using Microsoft.Extensions.Caching.Memory;
using Microsoft.EntityFrameworkCore;
using Api.Repository.Models;
using Api.RepositoryCommon;

namespace Api.Repository
{
    public class AppDbContext : DbContextBase
    {
        private readonly IMemoryCache _iCache;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options, IMemoryCache cache) : base(options)
        {
            _iCache = cache;
        }
        public DbSet<Garage> Garages { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Clients> Clients { get; set; }
        public DbSet<Cars> Cars { get; set; }
        public DbSet<VisitRepair> VisitRepair { get; set; }
        public DbSet<VisitCarCard> VisitCarCard { get; set; }
        public DbSet<ServiceList> ServiceList { get; set; }
    }
}
