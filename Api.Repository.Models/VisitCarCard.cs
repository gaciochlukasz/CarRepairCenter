using Api.Repository.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Repository.Models
{
    public class VisitCarCard : BaseModel, IEntity
    {
        public DateTime AcceptanceDate { get; set; }
        public string Mileage { get; set; }
        public DateTime ReceiptDate { get; set; }
        public string EstimateCost { get; set; }
        public string Valuables { get; set; }
        public bool RegistrationDocument { get; set; }
        public bool OCDocument { get; set; }
        public bool KeyLeft { get; set; }
        public bool TestDriveConsent { get; set; }
        public bool UsedPatrsReturn { get; set; }
        public string FaultDescription { get; set; }
        public string ExternalConditionDescription { get; set; }
    }
}
