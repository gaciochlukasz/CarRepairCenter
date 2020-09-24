using Api.Repository.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class ServiceList : BaseModel, IEntity
    {
        public string Service { get; set; }
        public string ServicePrice { get; set; }
        public string PartsPrice { get; set; }
        public bool Done { get; set; }
        public long VisitRepairId { get; set; }
    }
}
