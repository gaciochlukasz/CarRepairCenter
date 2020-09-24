using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Common;
using Api.Common.Enums;
using Api.Controllers;
using Api.IService;
using Api.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairCenter.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class ClientController : BaseController
    {
        private readonly IClientsService _clientsService;

        public ClientController(IClientsService clientService)
        {
            if (clientService != null)
            {
                _clientsService = clientService;
            }
        }
        
        [HttpPost, Route(ApiRoutingDefinitions.CreateNewClient)]
        [ProducesResponseType(typeof(ApiResponse<long>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> CreateNewClient(ClientsDto client)
        {
            return await Task.Run(() => CallApi(() => _clientsService.CreateNewClient(client)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetClients)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ClientsDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetClients()
        {
            return await Task.Run(() => CallApi(() => _clientsService.GetClients()));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetClientByID)]
        [ProducesResponseType(typeof(ApiResponse<ClientsDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetClientByID(long id)
        {
            return await Task.Run(() => CallApi(() => _clientsService.GetClientByID(id)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.EditClient)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> EditClient(ClientsDto client)
        {
            return await Task.Run(() => CallApi(() => _clientsService.EditClient(client)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetClientCars)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<CarsDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetClientCars(long clientId)
        {
            return await Task.Run(() => CallApi(() => _clientsService.GetClientCars(clientId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.AddClientCar)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> AddClientCar(CarsDto clientCar)
        {
            return await Task.Run(() => CallApi(() => _clientsService.AddClientCar(clientCar)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.EditClientCar)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> EditClientCar(CarsDto clientCar)
        {
            return await Task.Run(() => CallApi(() => _clientsService.EditClientCar(clientCar)));
        }
    }
}
