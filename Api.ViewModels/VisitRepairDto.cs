using Api.Common.Enums;
using Api.Repository.Models;
using System.Collections.Generic;

namespace Api.ViewModels
{
    public class VisitRepairDto
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public ClientsDto Client { get; set; }
        public long CarId { get; set; }
        public CarsDto Car { get; set; }
        public long VisitCarCardId { get; set; }
        public VisitCarCardDto VisitCarCard { get; set; }
        public RepairStatusEnum Status { get; set; }
        public string Description { get; set; }
        public List<ServiceListDto> Services { get; set; }
    }
}
