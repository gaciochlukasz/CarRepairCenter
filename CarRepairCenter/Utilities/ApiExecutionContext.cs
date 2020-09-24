using Api.Common;
using Api.Repository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace CarRepairCenter.Utilities
{
    public class ApiExecutionContext : IApiExecutionContext
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ApiExecutionContext(IHttpContextAccessor httpContextAccessor, AppDbContext appDbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _appDbContext = appDbContext;
        }
        
        private long _garageId;
        public long GarageId
        {
            get
            {
                var id = _httpContextAccessor.HttpContext.Request.Headers["Garage-Id"].FirstOrDefault();
                if (id == null)
                    throw new UnauthorizedAccessException("Missing garage id");
                return int.Parse(id);
            }
        }

        public string AccessToken
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            }
        }

        public string RefreshToken
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Headers["RefreshToken"].FirstOrDefault();
            }
        }
    }
}
