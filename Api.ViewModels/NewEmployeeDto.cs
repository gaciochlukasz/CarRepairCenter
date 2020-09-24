using Api.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class NewEmployeeDto : CreateUserDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public PersonTypeEnum PersonType { get; set; }
    }
}
