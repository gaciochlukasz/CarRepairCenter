﻿using Api.Common.Enums;
using Api.Repository.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class Cars : BaseModel, IEntity
    {
        public string CarBrand { get; set; }
        public string CarName { get; set; }
        public string RegistrationNo { get; set; }
        public string VinNo { get; set; }
        public string FirstRegisterDate { get; set; }
        public string NameOwner { get; set; }
        public string PeselOrRegonOwner { get; set; }
        public string AddressOwner { get; set; }
        public CarTypeEnum CarType { get; set; }
        public string CarWeight { get; set; }
        public string EngineCapacity { get; set; }
        public string EnginePower { get; set; }
        public FuelTypeEnum FuelType { get; set; }
        public long ClientId { get; set; }
        public Clients Client { get; set; }
    }
}
