using Api.Models.Auth;
using Api.Repository.Models;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.IService
{
    public interface IGarageService
    {
        ApiResponse<long> CreateGarage(GarageAndUserDto garage);
        Task<ApiResponse<User>> LoginAsync(CreateUserDto login);
        ApiResponse<WhoAmIDto> WhoAmI(JwtDto authToken);
        ApiResponse<GarageDto> EditGarage(GarageDto garage);
        ApiResponse<bool> CreateNewEmployee(NewEmployeeDto employee);
        ApiResponse<IEnumerable<PersonDto>> GetEmployeesList();
    }
}
