import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check to see if a user has a valid JWT  
    // If they do, return true and allow the user to load the home component

    if (localStorage.getItem('username') == null) {
      return false;
      //this.router.navigate(['login']);

    } else {
      return true;
    }

  }
}