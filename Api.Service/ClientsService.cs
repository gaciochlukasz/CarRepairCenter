using Api.Common.Enums;
using Api.IRepository;
using Api.IService;
using Api.Repository.Models;
using Api.Service.Utilities;
using Api.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Service
{
    public class ClientsService : BaseService, IClientsService
    {
        public class ClientsServiceProfile : AutoMapper.Profile
        {
            public ClientsServiceProfile()
            {
                CreateMap<Clients, ClientsDto>();
                CreateMap<GarageDto, Garage>();
                CreateMap<Cars, CarsDto>();
                CreateMap<CarsDto, Cars>();

            }
        }
        private readonly IUnitOfWork _uow;
        public ClientsService(IUnitOfWork unitOfWorks) : base(unitOfWorks)
        {
            _uow = unitOfWorks;
        }

        public ApiResponse<long> CreateNewClient(ClientsDto client)
        {
            if (client == null)
                return new ApiResponse<long> { ResponseStatusCode = RestStatusCode.NotFound };

            var clientApi = client.ToRepo<Clients>();
            long clientId;
            using (_uow.BeginTransaction())
            {
                clientId = _uow.ClientsRepository.Create(clientApi);
                _uow.CommitTransaction();
            }

            return new ApiResponse<long>(responseResult: clientId);
        }

        public ApiResponse<IEnumerable<ClientsDto>> GetClients()
        {
            var response = new ApiResponse<IEnumerable<ClientsDto>>();
            var clients = _uow.ClientsRepository.GetAll().ToList();

            var cl = clients.ToApi<IEnumerable<ClientsDto>>();

            response.ResponseResult = cl;
            response.ResponseStatusCode = RestStatusCode.OK;

            return response;
        }

        public ApiResponse<ClientsDto> GetClientByID(long id)
        {
            var client = _uow.ClientsRepository.GetById(id);

            if (client == null)
            {
                return new ApiResponse<ClientsDto>(responseStatusCode: RestStatusCode.NotFound);
            }

            return new ApiResponse<ClientsDto>() { ResponseResult = client.ToApi<ClientsDto>(), ResponseStatusCode = RestStatusCode.OK };
        }

        public ApiResponse<bool> EditClient(ClientsDto client)
        {
            if (client == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using (_uow.BeginTransaction())
            {
                var clientRepo = _uow.ClientsRepository.GetById(client.Id);
                client.MergeObjects(clientRepo);
                _uow.ClientsRepository.Update(clientRepo);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(responseResult: true);
        }

        public ApiResponse<IEnumerable<CarsDto>> GetClientCars(long clientId)
        {
            if (clientId == 0)
                return new ApiResponse<IEnumerable<CarsDto>>(responseStatusCode: RestStatusCode.NotFound);

            var cars = _uow.CarsRepository.GetAll().Where(x => x.ClientId == clientId).ToList();

            return new ApiResponse<IEnumerable<CarsDto>>(responseResult: cars.ToApi<IEnumerable<CarsDto>>());
        }

        public ApiResponse<bool> AddClientCar(CarsDto clientCar)
        {
            if (clientCar == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using(_uow.BeginTransaction())
            {
                var carToRepo = clientCar.ToRepo<Cars>();
                _uow.CarsRepository.Create(carToRepo);
                _uow.CommitTransaction();
            }
            return new ApiResponse<bool>(responseResult: true);
        }

        public ApiResponse<bool> EditClientCar(CarsDto clientCar)
        {
            if (clientCar == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using (_uow.BeginTransaction())
            {
                var carToRepo = _uow.CarsRepository.GetById(clientCar.Id);
                clientCar.MergeObjects(carToRepo);
                _uow.CarsRepository.Update(carToRepo);
                _uow.CommitTransaction();
            }
            return new ApiResponse<bool>(responseResult: true);
        }
    }
}
