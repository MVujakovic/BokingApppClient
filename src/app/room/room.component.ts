import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Room } from './room.model';
import { RoomsService } from '../services/rooms.service';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomsService]
})
export class RoomComponent implements OnInit {

  rooms: Room[];
  accomodations: Accomodation[];
  accId: number;

  constructor(private roomsService: RoomsService,
  private accomodationsService: AccomodationsService) {
    
   }

  ngOnInit() {
    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih smestaja treba da se prosledi id korisnika, pa da se dobiju samo smestaji tog odredjenog korisnika
    //ovde ce trebati da se stavi idMenadzera koji hoce da dodaje sobe u svoje smestaje!!!
    this.accomodationsService.getAccomodationsByOwnerId(3).subscribe(
      (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    // this.accomodationsService.getAccomodations().subscribe(
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
  }

  addRoom(newRoom:Room,form:NgForm):void{
    newRoom.AccomodationId=this.accId;
     this.roomsService.postRoom(newRoom).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}