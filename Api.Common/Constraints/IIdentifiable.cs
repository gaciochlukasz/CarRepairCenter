using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Common.Constraints
{
    public interface IIdentifiable
    {
        long Id { get; set; }
    }
}
