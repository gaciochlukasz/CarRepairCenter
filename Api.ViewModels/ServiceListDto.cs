using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class ServiceListDto
    {
        public long Id { get; set; }
        public string Service { get; set; }
        public string ServicePrice { get; set; }
        public string PartsPrice { get; set; }
        public bool Done { get; set; }
        public long VisitRepairId { get; set; }
    }
}
