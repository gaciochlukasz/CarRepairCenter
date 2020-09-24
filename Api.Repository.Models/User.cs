using Api.Repository.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class User : BaseModel, IEntity
    {
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public long PersonId { get; set; }
    }
}
