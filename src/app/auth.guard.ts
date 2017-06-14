import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    // Check to see if a user has a valid JWT  
    // If they do, return true and allow the user to load the home component

    if (localStorage.getItem('user') == null) {
      this.router.navigate(['Login']);
      return false;
    }

    return true;

  }

  //  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //       if (localStorage.getItem('currentUser')) {
  //           return true;
  //       }

  //       this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url }});
  //       return false;
  //   }
}