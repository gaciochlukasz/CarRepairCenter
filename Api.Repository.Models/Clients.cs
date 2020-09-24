using Api.Repository.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class Clients : BaseModel, IEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Pesel { get; set; }
        public string BirthDay { get; set; }
        public string Country { get; set; }
        public string PostCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNo { get; set; }
        public string FlatNo { get; set; }
        public string Phone { get; set; }

    }
}
