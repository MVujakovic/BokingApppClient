import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  loggedIn: boolean;
  //role:string;
  title = 'BookingApp'
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
