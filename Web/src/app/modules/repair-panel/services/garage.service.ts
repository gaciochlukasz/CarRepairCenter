// Third-party
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Models
import { StorageService } from '../../../services/storage.service';
import { GarageModel } from 'src/app/models/garage.model';
import { GarageRestService } from 'src/app/services/garage-rest.service';
import { Urls } from '../urls.model';
import { NewEmployeeModel } from 'src/app/models/new-employee.model';

@Injectable()
export class GarageService {
  onGarageChange = new BehaviorSubject<GarageModel>(null);
  get currentGarage(): GarageModel {
    return this._currentGarage;
  }

  private _currentGarage: GarageModel;
  constructor(
    public restService: GarageRestService,
    private storage: StorageService
  ) {}

  setCurrentGarage(garage: GarageModel) {
    this._currentGarage = garage;
    this.restService.setGarageId(garage.id);
    this.storage.local.setCurrentGarage(garage);

    this.onGarageChange.next(garage);
  }

  editGarage(garage: GarageModel): Observable<typeof Urls.Garage.editGarage.type> {
    return this.restService.post(Urls.Garage.editGarage.url, garage);
  }

  createNewEmployee(employee: NewEmployeeModel): Observable<typeof Urls.Garage.createNewEmployee.type> {
    return this.restService.post(Urls.Garage.createNewEmployee.url, employee);
  }

  getEmployeesList(): Observable<typeof Urls.Garage.getEmployeesList.type> {
    return this.restService.get(Urls.Garage.getEmployeesList.url);
  }
}
