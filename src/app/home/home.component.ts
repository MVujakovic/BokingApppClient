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
  loggedIn:boolean; //ova je promenljiva samo za debug, nikad se ne uloguje! iance jedva se vidi ispis 'false' na gui-u. 
  title = 'BookingApp'
  constructor(private authService:AuthenticationService,public router: Router,) { }

  ngOnInit() {
  }
   
  logOut(){
    this.authService.logOut();
  }

  isLoggedIn() : boolean{
    this.username = localStorage.getItem("userToken");

    this.loggedIn=this.authService.isLoggedIn();
    return  this.loggedIn;
  }

  logIn(){
        this.router.navigate(["bookingApp/login"]);
    }

}
