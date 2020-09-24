// third-party
import { Injectable } from '@angular/core';

// Models
import { AccountModel } from '../models/account.model';
import { GarageModel } from '../models/garage.model';
import { PersonModel } from '../models/person';
import { EmployeeGarageModel } from '../modules/repair-panel/models/employee-garage.model';

@Injectable()
export class LocalStorageService {
  private readonly loggedUser = 'user';
  private readonly currentGarage = 'currentGarage';
  private readonly currentEmployee = 'currentEmployee';

  setLoggedUser(account: AccountModel) {
    if (!account) {
      localStorage.removeItem(this.loggedUser);
      return;
    }

    localStorage.setItem(this.loggedUser, JSON.stringify(account));
  }

  getLoggedUser(): AccountModel {
    return JSON.parse(localStorage.getItem(this.loggedUser));
  }

  setCurrentEmployee(employee: PersonModel | EmployeeGarageModel) {
    if (!employee) {
      localStorage.removeItem(this.currentEmployee);
      return;
    }

    localStorage.setItem(this.currentEmployee, JSON.stringify(employee));
  }

  getCurrentEmployee(): PersonModel | EmployeeGarageModel {
    return JSON.parse(localStorage.getItem(this.currentEmployee));
  }

  setCurrentGarage(garage: GarageModel) {
    if (!garage) {
      localStorage.removeItem(this.currentGarage);
      return;
    }

    localStorage.setItem(this.currentGarage, JSON.stringify(garage));
  }

  getCurrentGarage(): GarageModel {
    return JSON.parse(localStorage.getItem(this.currentGarage));
  }
}
