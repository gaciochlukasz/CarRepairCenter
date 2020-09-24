using Api.Common.Enums;
using Api.IRepository;
using Api.Models.Auth;
using Api.Repository.Models;
using Api.Service.Utilities;
using Api.Services.IService;
using Api.ViewModels;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Service
{
    public class GarageService : AutoMapper.Profile, IGarageService
    {
        protected readonly IUnitOfWork _uow;
        private long personId;

        public GarageService()
        {
            CreateMap<GarageDto, Garage>();
            CreateMap<GarageDto, Person>();
            CreateMap<Person, PersonDto>()
                .ForMember(dst => dst.GarageId, opts => opts.MapFrom(src => src.GarageContextId));

            CreateMap<NewEmployeeDto, Person>();
            CreateMap<NewEmployeeDto, User>();
        }

        public GarageService(IUnitOfWork unitOfWorks)
        {
            _uow = unitOfWorks;
        }

        public ApiResponse<WhoAmIDto> WhoAmI(JwtDto authToken)
        {
            var ar = new ApiResponse<WhoAmIDto>();
            var identityId = authToken.Id;

            var user = _uow.UserRepository.GetAll(false)
                .FirstOrDefault(x => x.Id == identityId);

            if (user == null)
                return new ApiResponse<WhoAmIDto>(RestStatusCode.BadRequest);

            var person = _uow.PersonRepository.GetAll(false).FirstOrDefault(x => x.Id == user.PersonId);

            var garageId = person.GarageContextId;

            ar.ResponseResult = new WhoAmIDto
            {
                Id = user.Id,
                AuthorizationToken = authToken,
                MainClaims = $"_{garageId}"
            };

            if (person.PersonType == 0)
                ar.ResponseResult.RedirectType = AuthRedirectType.AccountWithoutAccess;
            else
            {
                ar.ResponseResult.RedirectType = person.PersonType == PersonTypeEnum.Boss ?
                    AuthRedirectType.BossAccountWithAccess
                    : AuthRedirectType.EmployeeAccountWithAccess;
            }
            ar.ResponseStatusCode = RestStatusCode.OK;
            return ar;
        }

        public async Task<ApiResponse<User>> LoginAsync(CreateUserDto login)
        {
            var user = _uow.UserRepository.GetAll(false).FirstOrDefault(x => x.Email == login.Email);

            if (user == null)
                return new ApiResponse<User> { ResponseStatusCode = RestStatusCode.LoginFail };

            if (!VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
                return new ApiResponse<User> { ResponseStatusCode = RestStatusCode.LoginFail };

            return new ApiResponse<User>
            {
                ResponseResult = user,
                ResponseStatusCode = RestStatusCode.OK
            };
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public ApiResponse<long> CreateGarage(GarageAndUserDto garage)
        {
            if (garage == null)
            {
                return new ApiResponse<long> { ResponseStatusCode = RestStatusCode.NotFound };
            }

            var userExist = _uow.UserRepository.GetAll(false).FirstOrDefault(x => x.Email == garage.Email);

            if (userExist != null)
                return new ApiResponse<long> { ResponseStatusCode = RestStatusCode.AccountCreationFailed };

            long gId;
            using (_uow.BeginTransaction())
            {
                var createGarage = new Garage()
                {
                    Name = garage.GarageName,
                    Email = garage.Email
                };

                var garageId = _uow.GarageRepository.Create(createGarage, false);
                gId = garageId;

                createGarage.GarageContextId = garageId;
                _uow.GarageRepository.Update(createGarage, false);


                var createPerson = new Person()
                {
                    Name = garage.Name,
                    LastName = garage.LastName,
                    Email = garage.Email,
                    GarageContextId = garageId,
                    Active = true
                };
                createPerson.PersonType = PersonTypeEnum.Boss;

                personId = _uow.PersonRepository.Create(createPerson, false);


                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(garage.Password, out passwordHash, out passwordSalt);

                var userToRepo = new User()
                {
                    Email = garage.Email,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    PersonId = personId,
                    GarageContextId = garageId
                };

                _uow.UserRepository.Create(userToRepo, false);

                _uow.CommitTransaction();
            }

            return new ApiResponse<long>
            {
                ResponseResult = gId,
                ResponseStatusCode = RestStatusCode.OK
            };
        }

        public ApiResponse<GarageDto> EditGarage(GarageDto garage)
        {
            if (garage == null)
                return new ApiResponse<GarageDto>(responseStatusCode: RestStatusCode.NotFound);

            var garageRepo = _uow.GarageRepository.GetAll().FirstOrDefault();

            if (garageRepo == null)
                return new ApiResponse<GarageDto>(responseStatusCode: RestStatusCode.NotFound);

            using (_uow.BeginTransaction())
            {
                garage.MergeObjects(garageRepo);
                _uow.GarageRepository.Update(garageRepo);
                _uow.CommitTransaction();
            }

            return new ApiResponse<GarageDto>(responseResult: garageRepo.ToApi<GarageDto>());
        }

        public ApiResponse<bool> CreateNewEmployee(NewEmployeeDto employee)
        {
            if (employee == null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.AccountCreationFailed);

            var person = _uow.UserRepository.GetAll(false)
                .Where(x => x.Email == employee.Email).FirstOrDefault();

            if (person != null)
                return new ApiResponse<bool>(responseStatusCode: RestStatusCode.EmailExist);

            var personRepo = employee.ToRepo<Person>();
            var userRepo = employee.ToRepo<User>();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(employee.Password, out passwordHash, out passwordSalt);

            userRepo.PasswordHash = passwordHash;
            userRepo.PasswordSalt = passwordSalt;

            personRepo.PersonType = PersonTypeEnum.Employee;
            personRepo.Active = true;

            using (_uow.BeginTransaction())
            {
                long personId = _uow.PersonRepository.Create(personRepo);
                userRepo.PersonId = personId;
                _uow.UserRepository.Create(userRepo);
                _uow.CommitTransaction();
            }
            return new ApiResponse<bool>(true);
        }

        public ApiResponse<IEnumerable<PersonDto>> GetEmployeesList()
        {
            var employees = _uow.PersonRepository.GetAll()
                .Where(x => x.PersonType != PersonTypeEnum.Boss).ToList();

            return new ApiResponse<IEnumerable<PersonDto>>(responseResult: employees.ToApi<IEnumerable<PersonDto>>());
        }
    }
}
