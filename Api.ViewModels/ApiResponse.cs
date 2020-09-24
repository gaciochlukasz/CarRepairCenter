using Api.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.ViewModels
{
    public class ApiResponse<T>
    {
        public T ResponseResult { get; set; }

        public RestStatusCode ResponseStatusCode { get; set; } = RestStatusCode.NotSet;

        public string ResponseMessage { get; set; }

        public ApiResponse()
        {

        }

        public ApiResponse(T responseResult)
        {
            ResponseResult = responseResult;
        }

        public ApiResponse(RestStatusCode responseStatusCode, string responseMessage = "")
        {
            ResponseStatusCode = responseStatusCode;
            ResponseMessage = responseMessage;
        }
    }
}
