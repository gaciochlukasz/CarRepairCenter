using Api.ViewModels;
using System.Collections.Generic;

namespace Api.IService
{
    public interface IClientsService
    {
        ApiResponse<long> CreateNewClient(ClientsDto client);
        ApiResponse<IEnumerable<ClientsDto>> GetClients();
        ApiResponse<ClientsDto> GetClientByID(long id);
        ApiResponse<bool> EditClient(ClientsDto client);
        ApiResponse<IEnumerable<CarsDto>> GetClientCars(long clientId);
        ApiResponse<bool> AddClientCar(CarsDto clientCar);
        ApiResponse<bool> EditClientCar(CarsDto clientCar);

    }
}
