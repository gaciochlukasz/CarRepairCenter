using Api.Common.Enums;
using Api.IRepository;
using Api.IService;
using Api.Repository.Models;
using Api.Service.Utilities;
using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Api.Service
{
    public class PersonService : AutoMapper.Profile, IPersonService
    {
        public PersonService ()
        {
            CreateMap<PersonDto, PersonGarageDto>();
            CreateMap<GarageDto, Garage>();
            CreateMap<PersonDto, Person>()
                .ForMember(dst => dst.GarageContextId, opts => opts.MapFrom(src => src.GarageId));
        }
        private readonly IUnitOfWork _uow;
        public PersonService (IUnitOfWork unitOfWorks)
        {
            _uow = unitOfWorks;
        }
        public ApiResponse<PersonGarageDto> GetPerson(long id)
        {
            var user = _uow.UserRepository.GetById(id, false);

            if (user == null)
                return new ApiResponse<PersonGarageDto> { ResponseStatusCode = RestStatusCode.LoginFail };

            var person = _uow.PersonRepository.GetById(user.PersonId, false);
            
            if (person == null || !person.Active)
                return new ApiResponse<PersonGarageDto> { ResponseStatusCode = RestStatusCode.LoginFail };

            var garage = _uow.GarageRepository.GetAll(false).FirstOrDefault(x => x.Id == person.GarageContextId);

            if (garage == null)
                return new ApiResponse<PersonGarageDto> { ResponseStatusCode = RestStatusCode.LoginFail };

            var gts = garage.ToApi<GarageDto>();

            var pts = new PersonGarageDto()
            {
                Email = person.Email,
                LastName = person.LastName,
                Id = person.Id,
                Name = person.Name,
                PhoneNumber = person.PhoneNumber,
                Garage = gts,
                PersonType = person.PersonType,
                Active = person.Active
            };
            

            pts.Garage = gts;

            return new ApiResponse<PersonGarageDto>
            {
                ResponseResult = pts,
                ResponseStatusCode = RestStatusCode.OK
            };
        }

        public ApiResponse<PersonGarageDto> EditPersonProfile(PersonDto person)
        {
            if (person == null)
                return new ApiResponse<PersonGarageDto>(responseStatusCode: RestStatusCode.NotFound);
        
            var personRepo = _uow.PersonRepository.GetById(person.Id);

            var garageId = personRepo.GarageContextId;

            if (personRepo == null)
                return new ApiResponse<PersonGarageDto>(responseStatusCode: RestStatusCode.NotFound);

            using(_uow.BeginTransaction())
            {
                person.MergeObjects(personRepo);
                personRepo.GarageContextId = garageId;
                _uow.PersonRepository.Update(personRepo);
                _uow.CommitTransaction();
            }

            var garage = _uow.GarageRepository.GetAll().FirstOrDefault();

            if (garage == null)
                return new ApiResponse<PersonGarageDto> { ResponseStatusCode = RestStatusCode.LoginFail };

            var gts = garage.ToApi<GarageDto>();

            var pts = new PersonGarageDto()
            {
                Email = personRepo.Email,
                LastName = personRepo.LastName,
                Id = personRepo.Id,
                Name = personRepo.Name,
                PhoneNumber = personRepo.PhoneNumber,
                Garage = gts,
                PersonType = personRepo.PersonType
            };


            pts.Garage = gts;

            return new ApiResponse<PersonGarageDto>
            {
                ResponseResult = pts,
                ResponseStatusCode = RestStatusCode.OK
            };
        }

        public ApiResponse<bool> ChangeEmployeeStatus(PersonDto person)
        {
            if (person == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.NotFound);

            using(_uow.BeginTransaction())
            {
                var personRepo = person.ToRepo<Person>();
                _uow.PersonRepository.Update(personRepo);
                _uow.CommitTransaction();
            }

            return new ApiResponse<bool>(true);
        }
    }
}
