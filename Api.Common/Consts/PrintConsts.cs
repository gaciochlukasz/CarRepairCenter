using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Common.Consts
{
    public sealed class PrintConsts
    {
        public sealed class Garage
        {
            private const string Base = "garage_";

            public const string Name = Base + "name";
            public const string Address = Base + "address";
            public const string Nip = Base + "nip";
            public const string Regon = Base + "regon";
            public const string Phone = Base + "phone";
            public const string City = Base + "city";
        }

        public sealed class Client
        {
            private const string Base = "client_";

            public const string Name = Base + "name";
            public const string Address = Base + "address";
            public const string Phone = Base + "phone";

        }

        public sealed class Car
        {
            private const string Base = "car_";

            public const string CarBrand = Base + "car_brand";
            public const string CarName = Base + "car_name";
            public const string Vin = Base + "vin";
            public const string EngineCapacity = Base + "engine_capacity";
            public const string EnginePower = Base + "engine_power";
            public const string ProductionDate = Base + "production_date";
            public const string RegistrationNo = Base + "registration_no";
        }

        public sealed class CarCard
        {
            private const string Base = "car_card_";

            public const string Mileage = Base + "mileage";
            public const string AcceptanceDate = Base + "acceptance_date";
            public const string ReceiptDate = Base + "receip_date";
            public const string EstimateCost = Base + "estimate_cost";
            public const string Valuables = Base + "valuables";
            public const string ExternalConditionDescription = Base + "external_condition_description";
            public const string FaultDescription = Base + "fault_description";
            public const string RegistrationDocument = Base + "registration_document";
            public const string OCDocument = Base + "oc_document";
            public const string KeyLeft = Base + "key_left";
            public const string TestDriveConsent = Base + "test_drive";
            public const string UsedPatrsReturn = Base + "used_parts_return";
        }
    }
}
