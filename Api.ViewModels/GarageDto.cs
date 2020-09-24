using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class GarageDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Nr { get; set; }
        public string Nip { get; set; }
        public string Regon { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
