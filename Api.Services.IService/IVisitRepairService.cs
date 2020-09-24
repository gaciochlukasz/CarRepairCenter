using Api.Repository.Models;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.IService
{
    public interface IVisitRepairService
    {
        ApiResponse<long> AddVisitRepair(AddVisitRepairDto visitRepair, bool startVisit);
        ApiResponse<IEnumerable<VisitRepairDto>> GetRepairHistory(long clientId);
        ApiResponse<IEnumerable<VisitRepairDto>> GetActiveVisitRepair();
        ApiResponse<VisitRepairDto> GetVisitRepair(long visitReapirId);
        ApiResponse<bool> UpdateVisitRepairDesc(long visitRepairId, string desc);
        ApiResponse<bool> CloseVisitRepair(long visitRepairId);
        ApiResponse<bool> CancelVisitRepair(long visitReapirId);
        ApiResponse<bool> AddServiceToVisitRepair(ServiceListDto service);
        ApiResponse<IEnumerable<ServiceListDto>> GetServicesList(long visitRepairId);
        ApiResponse<bool> EditVisitReapirService(ServiceListDto service);
        ApiResponse<bool> DeleteVisitRepairService(long serviceId, long visitRepairId);
    }
}
