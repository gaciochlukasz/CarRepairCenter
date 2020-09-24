using Api.Common;
using Api.Common.Enums;
using Api.Controllers;
using Api.IService;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRepairCenter.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class PersonController : BaseController
    {
        private readonly IPersonService _personService;
        public PersonController (IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetCurrentPerson)]
        [ProducesResponseType(typeof(ApiResponse<PersonGarageDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetPerson(long accountId)
        {
            return await Task.Run(() => CallApi(() => _personService.GetPerson(accountId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.EditPersonProfile)]
        [ProducesResponseType(typeof(ApiResponse<PersonGarageDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> EditPersonProfile(PersonDto accountId)
        {
            return await Task.Run(() => CallApi(() => _personService.EditPersonProfile(accountId)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.ChangeEmployeeStatus)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> ChangeEmployeeStatus(PersonDto person)
        {
            return await Task.Run(() => CallApi(() => _personService.ChangeEmployeeStatus(person)));
        }
    }
}
