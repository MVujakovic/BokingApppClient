import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  loggedIn: boolean;
  title = 'BookingApp';

  constructor(private authService: AuthenticationService, public router: Router, ) {
}

  ngOnInit() {
  }

  logout() {

    this.authService.logOut();
    this.router.navigate(["bookingApp"]);
  }

  isLoggedIn(): boolean {
    this.username = localStorage.getItem("username");

    this.loggedIn = this.authService.isLoggedIn();
    return this.loggedIn;
  }

  getRole(): string {
    return this.authService.getCurrentUserRole();
  }

  goTo(location: string): void {
    window.location.hash = location;
  }

}



