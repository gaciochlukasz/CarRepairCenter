using Api.Common.Enums;
using Api.IRepository;
using AutoMapper;
using Api.ViewModels;

namespace Api.Service
{
    public class BaseService : IBaseService
    {
        public const string defaultLang = "pl-PL";
        /// <summary>
        /// ' asc'
        /// </summary>
        public const string _sordOrderAsc = " asc";
        protected readonly IUnitOfWork _uow;
        protected readonly IMapper _mapper;
        /// <summary>
        /// Used in services to return id after object creation
        /// </summary>
        protected long _returnId = -1;

        public BaseService(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }

        public BaseService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _uow = unitOfWork;
            _mapper = mapper;
        }

        public virtual void Dispose()
        {
            _uow.Dispose();
        }

        protected virtual ApiResponse<T> PrepareResponse<T>(string msg, RestStatusCode status, ApiResponse<T> ar = null)
        {
            if (ar == null)
            {
                ar = new ApiResponse<T>();
            }

            ar.ResponseMessage = msg;
            ar.ResponseStatusCode = status;

            return ar;
        }
    }
}
