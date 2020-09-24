// third-party
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { PersonService } from '../modules/repair-panel/services/person.service';

// Services

@Injectable()
export class MeGuard implements CanActivate {
  constructor(protected personService: PersonService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    const personId = route.parent.params['id'];
    if (this.personService.currentPerson.id !== personId) {
      this.router.navigate(['/panel/dashboard']);
      return false;
    }
    return true;
  }
}
