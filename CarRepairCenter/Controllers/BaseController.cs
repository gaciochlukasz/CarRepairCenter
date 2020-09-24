using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Api.Common;
using Api.Common.Enums;
using System.Security.Authentication;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        public BaseController()
        {
        }

        protected virtual ObjectResult CallApi<T>(Func<ApiResponse<T>> function)
        {
            var ar = new ApiResponse<T>();

            try
            {
                ar = function();
                ar.ResponseStatusCode = ar.ResponseStatusCode <= RestStatusCode.NotSet ? RestStatusCode.OK : ar.ResponseStatusCode;
            }
            catch (ApplicationException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.InternalServerError;
            }
            catch (TimeoutException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.RequestTimeout;

            }
            catch (UnauthorizedAccessException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Forbidden;
            }
            catch (AuthenticationException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Unauthorized;
            }
            catch (Exception e)
            {
                HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.InternalServerError;

                // handle Exception
            }


            return StatusCode(HandleRestStatusCode(ar.ResponseStatusCode), ar);
        }
        protected async Task<ObjectResult> CallAsyncApi<T>(Func<Task<ApiResponse<T>>> function)
        {
            var ar = new ApiResponse<T>();

            try
            {
                ar = await function();
                ar.ResponseStatusCode = ar.ResponseStatusCode <= RestStatusCode.NotSet ? RestStatusCode.OK : ar.ResponseStatusCode;
            }
            catch (ApplicationException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.InternalServerError;

            }
            catch (TimeoutException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.RequestTimeout;

            }
            catch (UnauthorizedAccessException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Forbidden; // dyskusja: notauthorized ?
            }
            catch (AuthenticationException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Unauthorized;
            }
            catch (Exception e)
            {
                HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.InternalServerError;

                // handle Exception
            }


            return StatusCode(HandleRestStatusCode(ar.ResponseStatusCode), ar);
        }


        protected ApiResponse<T> Call<T>(Func<ApiResponse<T>> function)
        {
            var ar = new ApiResponse<T>();

            try
            {
                ar = function();
                ar.ResponseStatusCode = ar.ResponseStatusCode <= RestStatusCode.NotSet ? RestStatusCode.OK : ar.ResponseStatusCode;
            }
            catch (ApplicationException e)
            {
                ar = HandleException(ar, e);
            }
            catch (TimeoutException e)
            {
                ar = HandleException(ar, e);
            }
            catch (UnauthorizedAccessException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Unauthorized;
            }
            catch (Exception e)
            {
                HandleException(ar, e);
                // handle Exception
            }

            return ar;
        }

        protected async Task<ApiResponse<T>> CallAsync<T>(Func<Task<ApiResponse<T>>> function)
        {
            var ar = new ApiResponse<T>();

            try
            {
                ar = await function();
                ar.ResponseStatusCode = ar.ResponseStatusCode <= RestStatusCode.NotSet ? RestStatusCode.OK : ar.ResponseStatusCode;
            }
            catch (ApplicationException e)
            {
                ar = HandleException(ar, e);
            }
            catch (TimeoutException e)
            {
                ar = HandleException(ar, e);
            }
            catch (UnauthorizedAccessException e)
            {
                ar = HandleException(ar, e);
                ar.ResponseStatusCode = RestStatusCode.Unauthorized;
            }
            catch (Exception e)
            {
                HandleException(ar, e);
            }

            return ar;
        }

        protected virtual ApiResponse<T> HandleException<T>(ApiResponse<T> ar, Exception ex)
        {
            ar.ResponseStatusCode = RestStatusCode.InternalServerError;

            if (ex.InnerException != null)
            {
                ar.ResponseMessage = ex.InnerException.Message;
            }
            else
            {
                ar.ResponseMessage = ex.Message;
            }

            return ar;
        }

        private int HandleRestStatusCode(RestStatusCode statusCode)
        {
            if (statusCode == RestStatusCode.RequestWasCreated)
            {
                return (int)RestStatusCode.Created;
            }

            if ((int)statusCode > (int)RestStatusCode.HttpVersionNotSupported)
            {
                return (int)RestStatusCode.InternalServerError;
            }

            return (int)statusCode;
        }

    }
}
