import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register';
import { LoginModel } from '../models/login.mode';
import { AccountModel } from '../models/account.model';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { Urls } from '../modules/repair-panel/urls.model';
import { PersonService } from '../modules/repair-panel/services/person.service';
import { Router } from '@angular/router';
import { GarageService } from '../modules/repair-panel/services/garage.service';
import { PersonGarageModel } from '../modules/repair-panel/models/person-garage.model';
import { BlockUIService } from './block-ui.service';
import { InfoMessageService } from './info-message.service';

@Injectable()
export class AuthService {

  loggedUserId: number;

  get loggedUser(): AccountModel {
    return this.storageService.local.getLoggedUser();
  }

  constructor(private storageService: StorageService,
    private restService: RestService,
    private personService: PersonService,
    private garageService: GarageService,
    private router: Router,
    private blockUi: BlockUIService,
    private infoMessage: InfoMessageService) { }

  isLoggedIn(): boolean {
    return !!this.loggedUserId;
  }

  logout() {
    this.loggedUserId = 0;
    this.restService.setToken(null);
    this.storageService.clear();
    this.moveToLoginPage();
  }

  private moveToLoginPage() {
    document.location.href = '/';
  }

  registerUser(user: RegisterModel): Observable<typeof Urls.Auth.register.type> {
    return this.restService.post(Urls.Auth.register.url, user);
  }

  checkToken(): Observable<typeof Urls.Auth.checkToken.type> {
    return this.restService.get(Urls.Auth.checkToken.url);
  }

  signIn(login: LoginModel): Observable<typeof Urls.Auth.signIn.type> {
    return this.restService.post(Urls.Auth.signIn.url, login);
  }

  login(account: AccountModel) {
    this.storageService.local.setCurrentGarage(null);
    this.storageService.local.setCurrentEmployee(null);

    const garageId = Number(account.mainClaims);
    this.restService.setToken(account.authorizationToken.authToken);
    this.storageService.local.setLoggedUser(account);
    this.loggedUserId = account.id;

    this.personService.restService.setToken(account.authorizationToken.authToken);
    this.garageService.restService.setGarageId(garageId);
    this.personService.getCurrentPerson(account.id).subscribe((person: PersonGarageModel) => {
      if (!person.garage) {
        this.router.navigate(['/']);
        return false;
      } else {
        this.personService.currentPerson = person;

        this.garageService.setCurrentGarage(person.garage);
        this.router.navigate(['/panel/dashboard']);
      }
    }, () => {
      this.blockUi.mainLockAll(false);
      this.infoMessage.openErrorInfo('Wystąpił błąd podczas logowania');
    });
  }
}
