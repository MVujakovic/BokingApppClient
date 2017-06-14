import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { RoomReservations } from './roomReservations.model';
import { RoomReservatonsService } from '../services/roomReservations.service';
import { Room } from '../room/room.model';
import { RoomsService } from '../services/rooms.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-roomReservations',
  templateUrl: './roomReservations.component.html',
  styleUrls: ['./roomReservations.component.css'],
  providers: [RoomReservatonsService]
})
export class RoomReservationsComponent implements OnInit {

  roomReservations: RoomReservations[];
  rooms: Room[];
  roomId: number;

  constructor(private roomReservationsService: RoomReservatonsService,
  private roomsService: RoomsService) {
    
   }

  ngOnInit() {
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih soba bi se prvo trebala odabrati country,
    //regija,grad i smestaj
    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addRoomReservation(newRoomReservation:RoomReservations,form:NgForm):void{
    newRoomReservation.RoomId=this.roomId;
    newRoomReservation.AppUserId=1; //ovo treba da bude id korisnika koji rezervise
    newRoomReservation.Timestamp=new Date(Date.now());
     this.roomReservationsService.postRoomReservation(newRoomReservation).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}