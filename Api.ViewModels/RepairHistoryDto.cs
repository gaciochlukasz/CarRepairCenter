using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class RepairHistoryDto
    {
        public VisitRepairDto VisitRepair { get; set; }
        public CarsDto VisitCar { get; set; }
    }
}
