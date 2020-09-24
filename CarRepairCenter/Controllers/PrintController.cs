using Api.Common;
using Api.Common.Enums;
using Api.Controllers;
using Api.IService;
using Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRepairCenter.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class PrintController : BaseController
    {
        private readonly IPrintService _printService;

        public PrintController(IPrintService printService)
        {
            _printService = printService;
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetCarCardPdf)]
        [ProducesResponseType(typeof(ApiResponse<byte[]>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetCarCardPrf(long visitRepairId)
        {
            return await Task.Run(() => CallApi(() => _printService.PrintVisitCarCard(visitRepairId)));
        }
    }
}
