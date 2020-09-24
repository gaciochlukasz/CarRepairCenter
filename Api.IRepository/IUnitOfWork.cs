using Api.IRepositoryCommon;
using Api.Repository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.IRepository
{
    public interface IUnitOfWork : IUnitOfWorkBase
    {
        IGarageRepository GarageRepository { get; }
        IUserRepository UserRepository { get; }
        IPersonRepository PersonRepository { get; }
        ICarsRepository CarsRepository { get; }
        IClientsRepository ClientsRepository { get; }
        IVisitRepairRepository VisitRepairRepository { get; }
        IVisitCarCardRepository VisitCarCardRepository { get; }
        IServiceListRepository ServiceListRepository { get; }
    }
}
