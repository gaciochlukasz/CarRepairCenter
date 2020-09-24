using System.Linq;
using Api.Repository.Models;
using Api.ViewModels;
using AutoMapper;

namespace Api.Service.Utilities
{
    public static class AutoMapperConfig
    {
        public static void Initialize(IMapperConfigurationExpression cfg)
        {
            cfg.AddProfiles(typeof(AutoMapperConfig).Assembly);

            cfg.CreateMap<Garage, GarageDto>();
            cfg.CreateMap<Cars, CarsDto>();

            cfg.CreateMap<Person, PersonDto>();
            cfg.CreateMap<PersonDto, Person>();

            cfg.CreateMap<Clients, ClientsDto>();
            cfg.CreateMap<ClientsDto, Clients>();

            cfg.CreateMap<VisitRepair, VisitRepairDto>();
            cfg.CreateMap<VisitRepairDto, VisitRepair>();

            cfg.CreateMap<VisitCarCard, VisitCarCardDto>();
            cfg.CreateMap<VisitCarCardDto, VisitCarCard>();

            cfg.CreateMap<ServiceList, ServiceListDto>();
            cfg.CreateMap<ServiceListDto, ServiceList>();
        }
    }
}