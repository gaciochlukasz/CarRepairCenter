using Api.Common;
using Api.IRepository;
using Api.IRepositoryCommon;
using Api.Repository.Mechanic;
using Api.Repository.Models;
using Api.RepositoryCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository
{
    public class UnitOfWork : UnitOfWorkBase, IUnitOfWork
    {
        public UnitOfWork(AppDbContext appDbContext, IApiExecutionContext appEx) 
            : base(appDbContext, appEx)
        {
        }
        
        private AppDbContext AppDbContext => (AppDbContext)appDbContext;

        private IGarageRepository _garageRepository;
        private IUserRepository _userRepository;
        private IPersonRepository _personRepository;
        private ICarsRepository _carsRepository;
        private IClientsRepository _clientsRepository;
        private IVisitRepairRepository _visitRepairRepository;
        private IVisitCarCardRepository _visitCarCardRepository;
        private IServiceListRepository _serviceListRepository;

        public IGarageRepository GarageRepository
        {
            get
            {
                if (_garageRepository == null)
                {
                    _garageRepository = new GarageRepository(AppDbContext, appEx);
                }
                return _garageRepository;
            }
        }

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(AppDbContext, appEx);
                }
                return _userRepository;
            }
        }

        public IPersonRepository PersonRepository
        {
            get
            {
                if (_personRepository == null)
                {
                    _personRepository = new PersonRepository(AppDbContext, appEx);
                }
                return _personRepository;
            }
        }

        public ICarsRepository CarsRepository
        {
            get
            {
                if (_carsRepository == null)
                {
                    _carsRepository = new CarsRepository(AppDbContext, appEx);
                }
                return _carsRepository;
            }
        }

        public IClientsRepository ClientsRepository
        {
            get
            {
                if (_clientsRepository == null)
                {
                    _clientsRepository = new ClientsRepository(AppDbContext, appEx);
                }
                return _clientsRepository;
            }
        }

        public IVisitRepairRepository VisitRepairRepository
        {
            get
            {
                if (_visitRepairRepository == null)
                {
                    _visitRepairRepository = new VisitRepairRepository(AppDbContext, appEx);
                }
                return _visitRepairRepository;
            }
        }

        public IVisitCarCardRepository VisitCarCardRepository
        {
            get
            {
                if (_visitCarCardRepository == null)
                {
                    _visitCarCardRepository = new VisitCarCardRepository(AppDbContext, appEx);
                }
                return _visitCarCardRepository;
            }
        }

        public IServiceListRepository ServiceListRepository
        {
            get
            {
                if (_serviceListRepository == null)
                {
                    _serviceListRepository = new ServiceListRepository(AppDbContext, appEx);
                }
                return _serviceListRepository;
            }
        }

        protected override void InitDbContext()
        {
            appDbContext.Database.SetCommandTimeout(120);
        }
    }
}