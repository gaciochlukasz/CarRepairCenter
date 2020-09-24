using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class PersonGarageDto : PersonDto
    {
        public GarageDto Garage { get; set; }
    }
}
