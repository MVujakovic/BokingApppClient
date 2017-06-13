import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { AppUser } from './appUser.model';
import { AppUsersService } from '../services/appUsers.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-appUser',
  templateUrl: './appUser.component.html',
  styleUrls: ['./appUser.component.css'],
  providers: [AppUsersService]
})
export class AppUserComponent implements OnInit {

  appUsers: AppUser[];

  constructor(private appUsersService: AppUsersService) {
    
   }

  ngOnInit() {
    //Ovo za prikaz korisnika sa komentarima
    // this.appUsersService.getAppUsersWithComments().subscribe(
    //   (c: any) => {this.appUsers = c; console.log(this.appUsers)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //Ovo za prikaz korisnika sa smestajima
    // this.appUsersService.getAppUsersWithAccomodations().subscribe(
    //   (c: any) => {this.appUsers = c; console.log(this.appUsers)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //Ovo za prikaz korisnika sa RoomReservations
    // this.appUsersService.getAppUsersWithRoomReservations().subscribe(
    //   (c: any) => {this.appUsers = c; console.log(this.appUsers)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
  }

  addAppUser(newAppUser:AppUser,form:NgForm):void{
     this.appUsersService.postAppUser(newAppUser).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}