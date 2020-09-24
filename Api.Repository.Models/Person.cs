using Api.Common.Enums;
using Api.Repository.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Repository.Models
{
    public class Person : BaseModel, IEntity
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public PersonTypeEnum PersonType { get; set; }
        public User User { get; set; }
    }
}
