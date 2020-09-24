using Newtonsoft.Json;

namespace Api.Common
{
    public class ApiRoutingDefinitions
    {

        [JsonProperty]
        public const string ApiGarageUrl = "api/garage/";

        #region person
        private const string _person = "/person";

        private const string _garage = "/garage";

        [JsonProperty]
        public const string ApiUrl = "api/garage";

        [JsonProperty]
        public const string CheckToken = ApiGarageUrl + "check-token";

        [JsonProperty]
        public const string CreateGarage = ApiGarageUrl + "register";

        [JsonProperty]
        public const string Login = ApiGarageUrl + "login";

        [JsonProperty]
        public const string GetCurrentPerson = ApiUrl + _person + "/get-current-person";

        [JsonProperty]
        public const string EditPersonProfile = ApiUrl + _person + "/edit-person";

        [JsonProperty]
        public const string ChangeEmployeeStatus = ApiUrl + _person + "/change-employee-status";

        [JsonProperty]
        public const string EditGarage = ApiUrl + _garage + "/edit-garage";

        [JsonProperty]
        public const string CreateNewEmployee = ApiUrl + _garage + "/create-new-employee";

        [JsonProperty]
        public const string GetEmployeesList = ApiUrl + _garage + "/get-employees";
        #endregion

        #region client
        private const string _client = "client/";

        [JsonProperty]
        public const string CreateNewClient = ApiGarageUrl + _client + "create-new-client";

        [JsonProperty]
        public const string GetClients = ApiGarageUrl + _client + "get-clients";

        [JsonProperty]
        public const string GetClientByID = ApiGarageUrl + _client + "get-client-by-id";

        [JsonProperty]
        public const string EditClient = ApiGarageUrl + _client + "edit-client";

        [JsonProperty]
        public const string GetClientCars = ApiGarageUrl + _client + "get-client-cars";
        
        [JsonProperty]
        public const string AddClientCar = ApiGarageUrl + _client + "add-client-car";

        [JsonProperty]
        public const string EditClientCar = ApiGarageUrl + _client + "edit-client-car";
        #endregion

        #region VisitRepair
        private const string _visitRepair = "visit-repair/";

        [JsonProperty]
        public const string AddVisitRepair = ApiGarageUrl + _visitRepair + "add-visit-repair";

        [JsonProperty]
        public const string GetRepairHistory = ApiGarageUrl + _visitRepair + "get-repair-history";

        [JsonProperty]
        public const string GetActiveVisitRepair = ApiGarageUrl + _visitRepair + "get-active-visit-repair";

        [JsonProperty]
        public const string GetVisitRepair = ApiGarageUrl + _visitRepair + "get-visit-repair";

        [JsonProperty]
        public const string UpdateVisitRepairDesc = ApiGarageUrl + _visitRepair + "update-visit-repair-desc";

        [JsonProperty]
        public const string CloseVisitRepair = ApiGarageUrl + _visitRepair + "close-visit-repair";

        [JsonProperty]
        public const string CancelVisitRepair = ApiGarageUrl + _visitRepair + "cancel-visit-repair";

        [JsonProperty]
        public const string AddServiceToVisitRepair = ApiGarageUrl + _visitRepair + "add-service-to-visit";
        
        [JsonProperty]
        public const string GetServicesList = ApiGarageUrl + _visitRepair + "get-services-list";

        [JsonProperty]
        public const string EditVisitRepairService = ApiGarageUrl + _visitRepair + "edit-visit-repair-service";

        [JsonProperty]
        public const string DeleteVisitRepairService = ApiGarageUrl + _visitRepair + "delete-visit-repair-service";
        #endregion

        #region Print
        private const string _print = "/print";

        [JsonProperty]
        public const string GetCarCardPdf = ApiUrl + _print + "/get-car-card-pdf";

        #endregion
    }
}
