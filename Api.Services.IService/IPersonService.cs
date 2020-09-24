using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.IService
{
    public interface IPersonService
    {
        ApiResponse<PersonGarageDto> GetPerson(long id);
        ApiResponse<PersonGarageDto> EditPersonProfile(PersonDto person);
        ApiResponse<bool> ChangeEmployeeStatus(PersonDto person);
    }
}
