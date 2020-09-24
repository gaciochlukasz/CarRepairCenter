import { Injectable } from '@angular/core';
import { GarageRestService } from 'src/app/services/garage-rest.service';
import { AddVisitRepairModel } from 'src/app/models/visit-repair/add-visit-repair.model';
import { Observable } from 'rxjs';
import { Urls } from '../urls.model';
import { ServiceListModel } from 'src/app/models/visit-repair/service-list.model';

@Injectable({
  providedIn: 'root'
})
export class VisitRepairService {

  constructor(private rest: GarageRestService) { }

  addVisitRepair(visitRepair: AddVisitRepairModel, startVisit: boolean): Observable<typeof Urls.VisitRepair.addVisitRepair.type> {
    return this.rest.post(Urls.VisitRepair.addVisitRepair.url(startVisit), visitRepair);
  }

  getRepairHistory(clientId: number): Observable<typeof Urls.VisitRepair.getRepairHistory.type> {
    return this.rest.get(Urls.VisitRepair.getRepairHistory.url(clientId));
  }

  getActiveVisitRepair(): Observable<typeof Urls.VisitRepair.getActiveVisitRepair.type> {
    return this.rest.get(Urls.VisitRepair.getActiveVisitRepair.url);
  }

  getVisitRepair(visitRepairId: number): Observable<typeof Urls.VisitRepair.getVisitRepair.type> {
    return this.rest.get(Urls.VisitRepair.getVisitRepair.url(visitRepairId));
  }

  updateVisitRepairDesc(visitRepairId: number, desc: string): Observable<typeof Urls.VisitRepair.updateVisitRepairDesc.type> {
    return this.rest.post(Urls.VisitRepair.updateVisitRepairDesc.url(visitRepairId, desc), null);
  }

  closeVisitRepair(visitRepairId: number): Observable<typeof Urls.VisitRepair.closeVisitRepair.type> {
    return this.rest.post(Urls.VisitRepair.closeVisitRepair.url(visitRepairId), null);
  }

  cancelVisitRepair(visitRepairId: number): Observable<typeof Urls.VisitRepair.cancelVisitRepair.type> {
    return this.rest.post(Urls.VisitRepair.cancelVisitRepair.url(visitRepairId), null);
  }

  addVisitRepairService(service: ServiceListModel): Observable<typeof Urls.VisitRepair.addVisitRepairService.type> {
    return this.rest.post(Urls.VisitRepair.addVisitRepairService.url, service);
  }

  getServicesList(visitReapirId): Observable<typeof Urls.VisitRepair.getServicesList.type> {
    return this.rest.get(Urls.VisitRepair.getServicesList.url(visitReapirId));
  }

  editVisitRepairService(service: ServiceListModel): Observable<typeof Urls.VisitRepair.editVisitRepairService.type> {
    return this.rest.post(Urls.VisitRepair.editVisitRepairService.url, service);
  }

  deleteVisitService(serviceId: number, visitRepairId: number): Observable<typeof Urls.VisitRepair.deleteVisitRepairService.type> {
    return this.rest.delete(Urls.VisitRepair.deleteVisitRepairService.url(serviceId, visitRepairId));
  }

  getCarCardPdf(visitReapirId: number): Observable<typeof Urls.Print.getCarCardPdf.type> {
    return this.rest.get(Urls.Print.getCarCardPdf.url(visitReapirId));
  }
}
