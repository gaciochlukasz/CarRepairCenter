using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Repository.Models
{
    public interface IEntity
    {
        long Id { get; set; }
        DateTime? Created { get; set; }
        DateTime? Modified { get; set; }
        long? CreatedBy { get; set; }
        long? ModifiedBy { get; set; }     
        long? GarageContextId { get; set; }
    }
}
