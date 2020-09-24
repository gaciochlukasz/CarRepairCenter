using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class AddVisitRepairDto
    {
        public VisitRepairDto VisitRepair { get; set; }
        public VisitCarCardDto VisitCarCard { get; set; }
    }
}
