import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';


import { Headers } from '@angular/http';
import { AuthenticationService } from '../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// Once the server successfully authenticates the user, 
// we'll save the JWT we get back in localStorage 
// and then redirect the user to the home page.

export class LoginComponent implements OnInit {
  Username: string;
  Password: string;

  constructor(public router: Router, public http: Http, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  // our logIn method in authService is an observable
  // we subscribe to it, and each time there is a new value 
  // emited from logIn observable, angular updates the view
  logIn(): void {

    this.authService.logIn(this.Username, this.Password, "password").subscribe(
      result => {

        // //login successful if there's a jwt token in the response
        // let user = result.json();

        // if (user && user.token) {

        //   //store user details and jwt token in local storage to keep 
        //   //user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        // }

        // pokusaji setovanje svega da vidis te promenljive u local storage-u, ali nista ne setuje
        localStorage.setItem('token', result.json().id_token);
        localStorage.setItem("userToken", result.json()['access_token']);
        localStorage.setItem('role', result.headers.get('Role'));         

        console.log(result.json());

         //this.router.navigate(['/BookingApp']);
         this.router.navigate(['country']);

        // ovo je samo proba, kao pristupa zasticenoj komponenoneti sad
        //this.router.navigate(['accomodation']); 
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );

    //form.reset(); 
  }

  // signup(event) {
  //   event.preventDefault();
  //   this.router.navigate(['Register']);
  // }

}
