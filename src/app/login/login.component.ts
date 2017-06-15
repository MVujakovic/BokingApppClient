import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm, FormsModule } from '@angular/forms';
import { Headers } from '@angular/http';

import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  Username: string;
  Password: string;

  constructor(public router: Router, public http: Http, private authService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    //  this.authService.logout();
  }

  login(): void {

   // debugger;

    this.authService.logIn(this.Username, this.Password, "password")
      .subscribe(result => {
        if (result === true) {

          this.router.navigate(['bookingApp']);
        } else {

          alert('Username or password is incorrect');    
          this.router.navigate(['bookingApp/login']);
        }
      });
  }
}




