import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../urls.model';
import { GarageRestService } from 'src/app/services/garage-rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { PersonGarageModel } from '../models/person-garage.model';
import { PersonModel } from 'src/app/models/person';

@Injectable()
export class PersonService {
  get currentPerson(): PersonGarageModel {
    if (this._currentPerson) {
      return this._currentPerson;
    }
    return this.storageService.local.getCurrentEmployee() as PersonGarageModel;
  }
  set currentPerson(person: PersonGarageModel) {
    this.storageService.local.setCurrentEmployee(person);
    this._currentPerson = person;
    this.isCurrentPerson = !!person;
  }

  isCurrentPerson: boolean;
  private _currentPerson: PersonGarageModel;

  constructor(private garageRestService: GarageRestService,
    private storageService: StorageService,
    public restService: GarageRestService) { }

  getCurrentPerson(id: number): Observable<typeof Urls.Person.getCurrentPerson.type> {
    return this.garageRestService.get(Urls.Person.getCurrentPerson.url(id));
  }

  editPersonProfile(person: PersonModel): Observable<typeof Urls.Person.editPersonProfile.type> {
    return this.restService.post(Urls.Person.editPersonProfile.url, person);
  }

  changeEmployeeStatus(employee: PersonModel): Observable<typeof Urls.Person.changeEmployeeStatus.type> {
    return this.restService.post(Urls.Person.changeEmployeeStatus.url, employee);
  }

  logout() {
    this._currentPerson = null;
  }
}
