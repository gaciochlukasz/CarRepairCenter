using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Api.Common.Enums;
using Api.Controllers;
using Api.IService;
using Api.Repository.Models;
using Api.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairCenter.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class VisitRepairController : BaseController
    {
        private readonly IVisitRepairService _visitRepairService;
        public VisitRepairController(IVisitRepairService visitRepairService)
        {
            _visitRepairService = visitRepairService;
        }

        [HttpPost, Route(ApiRoutingDefinitions.AddVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<AddVisitRepairDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> AddVisitRepair(AddVisitRepairDto visitRepair, bool startVisit)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.AddVisitRepair(visitRepair, startVisit)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetRepairHistory)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<VisitRepairDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetRepairHistory(long clientId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.GetRepairHistory(clientId)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetActiveVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<VisitRepairDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetActiveVisitRepair()
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.GetActiveVisitRepair()));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<VisitRepairDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetVisitRepair(long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.GetVisitRepair(visitRepairId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.UpdateVisitRepairDesc)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> UpdateVisitRepairDesc(long visitRepairId, string desc)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.UpdateVisitRepairDesc(visitRepairId, desc)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.CloseVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> CloseVisitRepair(long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.CloseVisitRepair(visitRepairId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.CancelVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> CancelVisitRepair(long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.CancelVisitRepair(visitRepairId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.AddServiceToVisitRepair)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> AddServiceToVisitReapir(ServiceListDto service)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.AddServiceToVisitRepair(service)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetServicesList)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<ServiceListDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetServicesLsit(long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.GetServicesList(visitRepairId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.EditVisitRepairService)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> EditVisitRepairService(ServiceListDto service)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.EditVisitReapirService(service)));
        }

        [HttpDelete, Route(ApiRoutingDefinitions.DeleteVisitRepairService)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> DeleteVisitRepairService(long serviceId, long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _visitRepairService.DeleteVisitRepairService(serviceId, visitRepairId)));
        }
    }
}
