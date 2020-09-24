using Api.Common;
using Api.Repository.Models;
using AutoMapper;
using System.Linq;

namespace Api.Service.Utilities
{
    public static class ConverterExtensions
    {       
        public static WebApi ToApi<WebApi>(this object coreObj)
        {                      
            return Mapper.Map<WebApi>(coreObj);
        }

        public static CoreApi ToRepo<CoreApi>(this object apiObj)
        {
            CoreApi result = Mapper.Map<CoreApi>(apiObj);      
            return result;
        }

        public static DestObj MergeObjects<SrcObj, DestObj>(this SrcObj srcObj, DestObj destObj)
        {
            return Mapper.Map(srcObj, destObj);
        }
    }
}
