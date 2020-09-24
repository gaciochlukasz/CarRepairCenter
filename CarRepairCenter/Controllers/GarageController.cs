using Microsoft.AspNetCore.Mvc;
using Api.Common;
using Api.Services.IService;
using Api.ViewModels;
using Api.Common.Enums;
using System.Threading.Tasks;
using Api.Controllers;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Api.Models.Auth;
using Microsoft.IdentityModel.Tokens;
using System.Collections;
using System.Collections.Generic;

namespace CarRepairCenter.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class GarageController : BaseController
    {

        private readonly IGarageService _garageService;
        private readonly IConfiguration _config;

        public GarageController(IGarageService garageService, IConfiguration config)
        {
            if (garageService != null)
            {
                _garageService = garageService;
            }

            _config = config;
        }
        [HttpGet, Route(ApiRoutingDefinitions.CheckToken)]
        [ProducesResponseType(typeof(ApiResponse<long>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public IActionResult CheckToken()
        {
            return Ok(new ApiResponse<long>()
            {
                ResponseResult = 1,
                ResponseStatusCode = RestStatusCode.OK
            });
        }
        [AllowAnonymous]
        [HttpPost, Route(ApiRoutingDefinitions.CreateGarage)]
        [ProducesResponseType(typeof(ApiResponse<long>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> CreateGarage(GarageAndUserDto garage)
        {
            return await Task.Run(() => CallApi(() => _garageService.CreateGarage(garage)));
        }
        [AllowAnonymous]
        [HttpPost, Route(ApiRoutingDefinitions.Login)]
        [ProducesResponseType(typeof(ApiResponse<WhoAmIDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> Login(CreateUserDto login)
        {
            var ar = await CallAsync(async () => await _garageService.LoginAsync(login));
            if (ar == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, ar.ResponseResult.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, ar.ResponseResult.Email),
                new Claim(ClaimTypes.Locality, ar.ResponseResult.GarageContextId.ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(2),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var newToken = tokenHandler.WriteToken(token);

            JwtDto jwt = new JwtDto
            {
                AuthToken = newToken,
                Id = ar.ResponseResult.Id,
                ExpiresIn = 2880
            };

            var result = _garageService.WhoAmI(jwt);

            return Ok(new ApiResponse<WhoAmIDto> ()
            {
                ResponseResult = result.ResponseResult,
                ResponseStatusCode = result.ResponseStatusCode
            });
        }

        [HttpPost, Route(ApiRoutingDefinitions.EditGarage)]
        [ProducesResponseType(typeof(ApiResponse<GarageDto>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> EditGarage(GarageDto garage)
        {
            return await Task.Run(() => CallApi(() => _garageService.EditGarage(garage)));
        }

        [HttpPost, Route(ApiRoutingDefinitions.CreateNewEmployee)]
        [ProducesResponseType(typeof(ApiResponse<bool>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> CreateNewEmployee(NewEmployeeDto employee)
        {
            return await Task.Run(() => CallApi(() => _garageService.CreateNewEmployee(employee)));
        }

        [HttpGet, Route(ApiRoutingDefinitions.GetEmployeesList)]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<PersonDto>>), (int)RestStatusCode.OK)]
        [ProducesResponseType((int)RestStatusCode.InternalServerError)]
        public async Task<IActionResult> GetEmployeesList()
        {
            return await Task.Run(() => CallApi(() => _garageService.GetEmployeesList()));
        }
    }
}