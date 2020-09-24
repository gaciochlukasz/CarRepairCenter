using Api.Common.Enums;
using Api.Repository.Models.Base;
using System.Collections.Generic;

namespace Api.Repository.Models
{
    public class VisitRepair : BaseModel, IEntity
    {
        public long ClientId { get; set; }
        public Clients Client { get; set; }
        public long CarId { get; set; }
        public Cars Car { get; set; }
        public long VisitCarCardId { get; set; }
        public VisitCarCard VisitCarCard { get; set; }
        public RepairStatusEnum Status { get; set; }
        public string Description { get; set; }
        public List<ServiceList> Services { get; set; }
    }
}
