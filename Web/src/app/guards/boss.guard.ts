// third-party
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';
import { PersonService } from '../modules/repair-panel/services/person.service';
import { PersonTypeEnum } from '../enums/person-type.enum';

@Injectable()
export class BossGuard implements CanActivate {
  constructor(protected personService: PersonService, private router: Router) {}

  canActivate() {
    if (this.personService.currentPerson.personType !== PersonTypeEnum.Boss) {
      this.router.navigate(['/panel/dashboard']);
      return true;
    }
    return true;
  }
}
