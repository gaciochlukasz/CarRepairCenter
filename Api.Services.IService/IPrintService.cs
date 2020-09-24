using Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.IService
{
    public interface IPrintService
    {
        ApiResponse<byte[]> PrintVisitCarCard(long visitRepairId);
    }
}
