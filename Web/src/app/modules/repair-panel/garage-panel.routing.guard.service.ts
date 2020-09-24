// third-party
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PersonService } from './services/person.service';
import { GarageService } from './services/garage.service';
import { StorageService } from '../../services/storage.service';
import { GarageModel } from 'src/app/models/garage.model';

// Services

@Injectable()
export class GarageGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private garageService: GarageService,
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.authService.loggedUser;
    const person = this.personService.currentPerson;
    if (!user) {
      this.router.navigate(['/']);
      return true;
    }

    if (!this.garageService.currentGarage) {
      const localGarage = this.storage.local.getCurrentGarage() as GarageModel;
      if (localGarage) {
        this.garageService.setCurrentGarage(localGarage);
      } else if (person) {
        this.garageService.setCurrentGarage(person.garage);
      } else {
        this.storage.clear();
        this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
}
