using Api.Common.Consts;
using Api.Common.Enums;
using Api.IRepository;
using Api.IService;
using Api.ViewModels;
using ExpertPdf.HtmlToPdf;
using HandlebarsDotNet;
using Microsoft.EntityFrameworkCore;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using PdfPageSize = SelectPdf.PdfPageSize;

namespace Api.Service
{
    public class PrintService : IPrintService
    {
        private readonly IUnitOfWork _uow;
        public PrintService(IUnitOfWork unitOfWorks)
        {
            _uow = unitOfWorks;
        }

        public ApiResponse<byte[]> PrintVisitCarCard(long visitRepairId)
        {
            if (visitRepairId == 0)
                return new ApiResponse<byte[]>(responseStatusCode: RestStatusCode.NotFound);

            var visit = _uow.VisitRepairRepository.GetAll()
                .Where(x => x.Id == visitRepairId)
                .Include(x => x.Car)
                .Include(x => x.Client)
                .Include(x => x.VisitCarCard)
                .FirstOrDefault();

            if (visit == null)
                return new ApiResponse<byte[]>(responseStatusCode: RestStatusCode.NotFound);

            var garage = _uow.GarageRepository.GetAll()
                .FirstOrDefault(x => x.Id == visit.GarageContextId);

            if (garage == null)
                return new ApiResponse<byte[]>(responseStatusCode: RestStatusCode.NotFound);

            string addressGarage =
                (string.IsNullOrEmpty(garage.Street) ? null : $"{ garage.Street}") +
                (string.IsNullOrEmpty(garage.Nr) ? null : $" {garage.Nr}") +
                (string.IsNullOrEmpty(garage.Street) ? null : $" {garage.City}");

            string clientAddress =
                (string.IsNullOrEmpty(visit.Client.Street) ? null : (visit.Client.Street)) +
                (string.IsNullOrEmpty(visit.Client.HouseNo) ? null : $" {visit.Client.HouseNo}") +
                (string.IsNullOrEmpty(visit.Client.FlatNo) ? null : $"/{visit.Client.FlatNo}") +
                (string.IsNullOrEmpty(visit.Client.PostCode) ? null : $", {visit.Client.PostCode}") +
                (string.IsNullOrEmpty(visit.Client.PostCode) ? null : $" {visit.Client.City}");
            
            var dataToPlace = new Dictionary<string, object>
            {
                { PrintConsts.Client.Address, clientAddress },
                { PrintConsts.Client.Name, $"{visit.Client.FirstName} {visit.Client.LastName}" },
                { PrintConsts.Client.Phone, visit.Client.Phone },
                { PrintConsts.Car.CarBrand, visit.Car.CarBrand },
                { PrintConsts.Car.CarName, visit.Car.CarName },
                { PrintConsts.Car.EngineCapacity, visit.Car.EngineCapacity },
                { PrintConsts.Car.EnginePower, visit.Car.EnginePower },
                { PrintConsts.Car.RegistrationNo, visit.Car.RegistrationNo },
                { PrintConsts.Car.Vin, visit.Car.VinNo },
                { PrintConsts.CarCard.AcceptanceDate, visit.VisitCarCard.AcceptanceDate.ToLocalTime().ToShortDateString()},
                { PrintConsts.CarCard.ReceiptDate, visit.VisitCarCard.ReceiptDate.ToLocalTime().ToShortDateString()},
                { PrintConsts.CarCard.EstimateCost, visit.VisitCarCard.EstimateCost},
                { PrintConsts.CarCard.ExternalConditionDescription, visit.VisitCarCard.ExternalConditionDescription},
                { PrintConsts.CarCard.FaultDescription, visit.VisitCarCard.FaultDescription},
                { PrintConsts.CarCard.KeyLeft, visit.VisitCarCard.KeyLeft ? "Tak" : "Nie" },
                { PrintConsts.CarCard.OCDocument, visit.VisitCarCard.OCDocument ? "Tak" : "Nie" },
                { PrintConsts.CarCard.RegistrationDocument, visit.VisitCarCard.RegistrationDocument ? "Tak" : "Nie" },
                { PrintConsts.CarCard.TestDriveConsent, visit.VisitCarCard.TestDriveConsent? "Tak" : "Nie" },
                { PrintConsts.CarCard.UsedPatrsReturn, visit.VisitCarCard.UsedPatrsReturn ? "Tak" : "Nie" },
                { PrintConsts.CarCard.Mileage, visit.VisitCarCard.Mileage },
                { PrintConsts.CarCard.Valuables, visit.VisitCarCard.Valuables},
                { PrintConsts.Garage.Address, addressGarage },
                { PrintConsts.Garage.Name, garage.Name },
                { PrintConsts.Garage.Nip, garage.Nip },
                { PrintConsts.Garage.Phone, garage.Phone },
                { PrintConsts.Garage.Regon, garage.Regon }
            };

            string path = Path.Combine(Environment.CurrentDirectory, "Data/templates", "car-card-template.html");
            //path = path.Replace("bin\\Debug\\netcoreapp2.2", "");



            using (var sr = new StreamReader(path))
            {
                string html = sr.ReadToEnd();
                var bytes = CreatePdf(html, dataToPlace);
                string cos = bytes.ToString();
                return new ApiResponse<byte[]>(responseResult: bytes);
            }

            return new ApiResponse<byte[]>();
        }

        private byte[] CreatePdf(string html, Dictionary<string, object> dataToPlace)
        {
            var template = Handlebars.Compile(html);
            var result = template(dataToPlace);

            result = result.Replace(@"\N", "<br />");
            return CreatePdf(result);
        }

        private byte[] CreatePdf(string result)
        {
            string pdf_page_size = "A4";
            PdfPageSize pageSize = (PdfPageSize)Enum.Parse(typeof(PdfPageSize), pdf_page_size, true);
            string pdf_orientation = "Portrait";
            PdfPageOrientation pdfOrientation = (PdfPageOrientation)Enum.Parse(typeof(PdfPageOrientation),
                pdf_orientation, true);
            int webPageWidth = 1024;
            int webPageHeight = 0;

            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();
            // set converter options
            converter.Options.PdfPageSize = pageSize;
            converter.Options.PdfPageOrientation = pdfOrientation;
            converter.Options.WebPageWidth = webPageWidth;
            converter.Options.WebPageHeight = webPageHeight;
            PdfDocument doc = converter.ConvertHtmlString(result);
            //Conversion failure. Could not find 'Select.Html.dep'. 
            // save pdf document
            byte[] data = doc.Save();

            return data;
        }
    }
}
