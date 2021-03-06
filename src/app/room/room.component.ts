import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Room } from './room.model';
import { RoomsService } from '../services/rooms.service';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { AuthenticationService } from '../services/auth.service';
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
  userId:number;

  rooms: Room[];
  accomodations: Accomodation[];
  accId: number;

  //za edit
 // accomByOwner:Accomodation[];
  roomsByAccomodation:Room[];
  roomEdit:Room;
  roomId:number;
  RoomNumber:String;
  BedCount:String;
  Description:String;
  PricePerNight:String;
  accIdEdit:number;
  accomodation:Accomodation;

  //za delete
  accIdDelete:number;
  accForDelete:Accomodation;
  roomsForDel:Room[];
  roomForDelete:Room;
  roomIdDelete:number;


  constructor(private roomsService: RoomsService,
  private accomodationsService: AccomodationsService,
  private authService: AuthenticationService) {
    this.roomsByAccomodation=[];
   }

  ngOnInit() {
  this.userId=this.authService.getCurrentUserId();

    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih smestaja treba da se prosledi id korisnika, pa da se dobiju samo smestaji tog odredjenog korisnika
    //ovde ce trebati da se stavi idMenadzera koji hoce da dodaje sobe u svoje smestaje!!!
    this.accomodationsService.getAccomodationsByOwnerId(this.userId).subscribe(
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

    setTimeout(()=>{
    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }

  accDeleteSelected(){
    this.accomodationsService.getAccomodationById(this.accIdDelete).subscribe(
      a => {
        this.accForDelete = a as Accomodation;
        this.roomsForDel=[];
        this.roomsForDel = this.accForDelete.Rooms;
      });
  }

  roomSelectedDelete(){
    this.roomsService.getRoomById(this.roomIdDelete).subscribe(
      r => {
        this.roomForDelete = r as Room;
      });
  }

  deleteRoom(){
    this.roomsService.delete(this.roomForDelete.Id).subscribe(this.deleteRoom);
    this.accIdDelete=0;
    this.roomIdDelete=0;

    setTimeout(()=>{
    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }

  accSelected(){
    this.accomodationsService.getAccomodationById(this.accIdEdit).subscribe(
      a => {
        this.accomodation = a as Accomodation;
        this.roomsByAccomodation=[];
        this.roomsByAccomodation = this.accomodation.Rooms;
        this.RoomNumber="";
        this.BedCount="";
        this.Description="";
        this.PricePerNight="";
      });

      //this.changeCounter++;
  }

  roomSelected(){
    this.roomsService.getRoomById(this.roomId).subscribe(
      r => {
        this.roomEdit = r as Room; 
        this.RoomNumber=this.roomEdit.RoomNumber.toString();
        this.BedCount=this.roomEdit.BedCount.toString();
        this.Description=this.roomEdit.Description;
        this.PricePerNight=this.roomEdit.PricePerNight.toString();
      });

    // this.RoomNumber=this.roomEdit.RoomNumber.toString();
    // this.BedCount=this.roomEdit.BedCount.toString();
    // this.Description=this.roomEdit.Description;
    // this.PricePerNight=this.roomEdit.PricePerNight.toString();
  }

  // isSelectedChanged(): boolean{
  //   if(this.changeCounter!=this.currChanges){
  //     this.currChanges++;
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  editRoom(newRoom:Room,form:NgForm):void{
    this.roomEdit.RoomNumber=newRoom.RoomNumber;
    this.roomEdit.BedCount=newRoom.BedCount;
    this.roomEdit.Description=newRoom.Description;
    this.roomEdit.PricePerNight=newRoom.PricePerNight;
    this.roomsService.putRoom(this.roomEdit.Id,this.roomEdit).subscribe(this.onPost);

    form.reset();
    this.RoomNumber="";
    this.BedCount="";
    this.Description="";
    this.PricePerNight="";
    this.accIdEdit=0;
    this.roomId=0;

    setTimeout(()=>{
    this.roomsService.getRooms().subscribe(
      (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }

  // onEditRoom(room:Room){
  //   this.RoomNumber=room.RoomNumber.toString();
  //   this.BedCount=room.BedCount.toString();
  //   this.Description=room.Description;
  //   this.PricePerNight=room.PricePerNight.toString();
  //   this.roomEdit=room;
  // }
}