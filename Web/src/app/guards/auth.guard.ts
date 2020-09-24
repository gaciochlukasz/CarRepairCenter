// third-party
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.loggedUser) {
      this.router.navigate(['/panel/dashboard']);
      return true;
    }
    return true;
  }
}
