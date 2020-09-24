using Api.Common.Enums;
using Api.Repository.Models;

namespace Api.ViewModels
{
    public class PersonDto
    {
        public long Id { get; set; }
        public long GarageId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public PersonTypeEnum PersonType { get; set; }
    }
}
