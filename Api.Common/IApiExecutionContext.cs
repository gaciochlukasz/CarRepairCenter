using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Common
{
    public interface IApiExecutionContext
    {
        long GarageId { get; }
        string AccessToken { get; }
        string RefreshToken { get; }
    }
}
