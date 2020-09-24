using Api.Common.Enums;
using Api.IRepository;
using Api.IService;
using Api.Repository.Models;
using Api.Service.Utilities;
using Api.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Service
{
    public class VisitRepairService : BaseService, IVisitRepairService
    {
        public class VisitRepairServiceProfile : AutoMapper.Profile
        {
            public VisitRepairServiceProfile()
            {
                CreateMap<Cars, CarsDto>();
                CreateMap<CarsDto, Cars>();
                CreateMap<VisitRepairDto, VisitRepair>()
                    .ForMember(dst => dst.Car, opts => opts.MapFrom(src => src.Car))
                    .ForMember(dst => dst.VisitCarCard, opts => opts.MapFrom(src => src.VisitCarCard))
                    .ForMember(dst => dst.Client, opts => opts.MapFrom(src => src.Client)); ;
            }
        }

        private readonly IUnitOfWork _uow;
        public VisitRepairService(IUnitOfWork unitOfWorks) : base(unitOfWorks)
        {
            _uow = unitOfWorks;
        }

        public ApiResponse<long> AddVisitRepair (AddVisitRepairDto visitRepair, bool startVisit)
        {
            if (visitRepair == null || visitRepair.VisitRepair == null || visitRepair.VisitCarCard == null)
                return new ApiResponse<long>(responseStatusCode: RestStatusCode.NotFound);
            long visitRepairId;
            using (_uow.BeginTransaction())
            {
                var carCard = visitRepair.VisitCarCard.ToRepo<VisitCarCard>();
                var visitR = visitRepair.VisitRepair.ToRepo<VisitRepair>();

                long visitCarCardId = _uow.VisitCarCardRepository.Create(carCard);
                visitR.VisitCarCardId = visitCarCardId;
                visitR.Status = RepairStatusEnum.Warsztat;
                visitRepairId = _uow.VisitRepairRepository.Create(visitR);

                _uow.CommitTransaction();
            }

            return new ApiResponse<long>(responseResult: visitRepairId);
        }

        public ApiResponse<IEnumerable<VisitRepairDto>> GetRepairHistory(long clientId)
        {
            if (clientId == 0)
                return new ApiResponse<IEnumerable<VisitRepairDto>>(responseStatusCode: RestStatusCode.NotFound);

            var response = new ApiResponse<IEnumerable<VisitRepairDto>>();
            
            var visit = _uow.VisitRepairRepository.GetAll()
                .Where(x => x.ClientId == clientId)
                .Include(x => x.Car)
                .Include(x => x.VisitCarCard)
                .ToList();
            
            response.ResponseResult = visit.ToApi<IEnumerable<VisitRepairDto>>();
            response.ResponseStatusCode = RestStatusCode.OK;
            return response;
        }

        public ApiResponse<IEnumerable<VisitRepairDto>> GetActiveVisitRepair()
        {
            var response = new ApiResponse<IEnumerable<VisitRepairDto>>();

            var visit = _uow.VisitRepairRepository.GetAll()
                .Where(x => x.Status == RepairStatusEnum.Warsztat)
                .Include(x => x.Car)
                .Include(x => x.VisitCarCard)
                .Include(x => x.Client)
                .ToList();

            response.ResponseResult = visit.ToApi<IEnumerable<VisitRepairDto>>();
            response.ResponseStatusCode = RestStatusCode.OK;
            return response;
        }

        public ApiResponse<VisitRepairDto> GetVisitRepair(long visitReapirId)
        {
            var visit =_uow.VisitRepairRepository.GetAll().Where(x => x.Id == visitReapirId)
                .Include(x => x.Car)
                .Include(x => x.Client)
                .Include(x => x.VisitCarCard)
                .FirstOrDefault();

            if (visit == null || (visit.Status == RepairStatusEnum.Anulowany || visit.Status == RepairStatusEnum.None))
                return new ApiResponse<VisitRepairDto>(responseStatusCode: RestStatusCode.NotFound);

            return new ApiResponse<VisitRepairDto>(responseResult: visit.ToApi<VisitRepairDto>());
        }

        public ApiResponse<bool> UpdateVisitRepairDesc(long visitRepairId, string desc)
        {
            var visit = _uow.VisitRepairRepository.GetById(visitRepairId);

            if (visit == null || visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using (_uow.BeginTransaction())
            {
                visit.Description = desc;
                _uow.VisitRepairRepository.Update(visit);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(true);
        }

        public ApiResponse<bool> CloseVisitRepair(long visitRepairId)
        {
            var visit = _uow.VisitRepairRepository.GetById(visitRepairId);

            if (visit == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            if (visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotAcceptable);

            using (_uow.BeginTransaction())
            {
                visit.Status = RepairStatusEnum.Gotowy;
                _uow.VisitRepairRepository.Update(visit);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(true);
        }

        public ApiResponse<bool> CancelVisitRepair(long visitRepairId)
        {
            if (visitRepairId == 0)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            var visit = _uow.VisitRepairRepository.GetById(visitRepairId);

            if (visit == null || visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using(_uow.BeginTransaction())
            {
                visit.Status = RepairStatusEnum.Anulowany;
                _uow.VisitRepairRepository.Update(visit);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(true);
        }

        public ApiResponse<bool> AddServiceToVisitRepair(ServiceListDto service)
        {
            if (service == null || service.VisitRepairId == 0)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            var visit = _uow.VisitRepairRepository.GetAll().FirstOrDefault(x => x.Id == service.VisitRepairId);

            if (visit == null || visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.VisitRepairNotFound);

            using (_uow.BeginTransaction())
            {
                service.Done = false;
                var serviceToRepo = service.ToRepo<ServiceList>();
                _uow.ServiceListRepository.Create(serviceToRepo);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(true);
        }

        public ApiResponse<IEnumerable<ServiceListDto>> GetServicesList (long visitRepairId)
        {
            if (visitRepairId == 0)
                new ApiResponse<IEnumerable<ServiceListDto>>(responseStatusCode: RestStatusCode.VisitRepairNotFound);

            var services = _uow.ServiceListRepository.GetAll()
                .Where(x => x.VisitRepairId == visitRepairId).ToList();

            return new ApiResponse<IEnumerable<ServiceListDto>>(responseResult: services.ToApi<IEnumerable<ServiceListDto>>());
        }

        public ApiResponse<bool> EditVisitReapirService(ServiceListDto service)
        {
            if (service == null || service.Id == 0 || service.VisitRepairId == 0)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            var serviceRepo = _uow.ServiceListRepository.GetById(service.Id);

            if (serviceRepo == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            var visit = _uow.VisitRepairRepository.GetById(service.VisitRepairId);

            if (visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotAcceptable);

            using (_uow.BeginTransaction())
            {
                service.MergeObjects(serviceRepo);
                _uow.ServiceListRepository.Update(serviceRepo);
                _uow.CommitTransaction();
            }
            return new ApiResponse<bool>(true);
        }

        public ApiResponse<bool> DeleteVisitRepairService(long serviceId, long visitRepairId)
        {
            if (serviceId == 0)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            var visit = _uow.VisitRepairRepository.GetById(visitRepairId);

            if (visit == null || visit.Status != RepairStatusEnum.Warsztat)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotAcceptable);

            using (_uow.BeginTransaction())
            {
                var service = _uow.ServiceListRepository.GetById(serviceId);
                _uow.ServiceListRepository.Delete(service);
                _uow.CommitTransaction();
            }
            return new ApiResponse<bool>(true);
        }
    }
}
