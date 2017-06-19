import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { RoomReservations } from './roomReservations.model';
import { RoomReservatonsService } from '../services/roomReservations.service';
import { Room } from '../room/room.model';
import { RoomsService } from '../services/rooms.service';
import { Country } from '../country/country.model';
import { Region } from '../region/region.model';
import { Accomodation } from '../accomodation/accomodation.model';
import { CountriesService } from '../services/countries.service';
import { RegionsService } from '../services/regions.service';
import { PlacesService } from '../services/places.service';
import { AccomodationsService } from '../services/accomodations.service';
import { Place } from '../place/place.model';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-roomReservations',
  templateUrl: './roomReservations.component.html',
  styleUrls: ['./roomReservations.component.css'],
  providers: [RoomReservatonsService,RoomsService,CountriesService,RegionsService,PlacesService,AccomodationsService]
})
export class RoomReservationsComponent implements OnInit {
  @ViewChild('dataContainer') dataContainer: ElementRef;
  @ViewChild('dataContainer2') dataContainer2:ElementRef;

  roomReservations: RoomReservations[];
  rooms: Room[];
  countries:Country[];
  regions:Region[];
  places:Place[];
  accomodations:Accomodation[];
  country:Country;
  countryId:number;
  region:Region;
  regionId:number;
  place:Place;
  placeId:number;
  accomodation:Accomodation;
  accId:number;
  roomWithRes:Room;
  roomId: number;
  Reservations:RoomReservations[];
  isAlreadyRes:boolean;
  aaa:boolean;

  //za edit
  accomodationsByUserId:Accomodation[];
  accIdEdit:number;
  accForEdit:Accomodation;
  roomResByUserId:RoomReservations[];
  roomReservationId:number;
  StartDate:Date;
  EndDate:Date;
  roomResEdit:RoomReservations;
  isAlreadyRes2:boolean;

  //za delete
  accIdDelete:number;
  accForDelete:Accomodation;
  roomReservationDeleteId:number;
  roomResForDelete:RoomReservations;
  deleteRoomResByUserId:RoomReservations[];



  constructor(private roomReservationsService: RoomReservatonsService,
  private roomsService: RoomsService,
  private countriesService:CountriesService,
  private regionsService:RegionsService,
  private placesService:PlacesService,
  private accomodationsService:AccomodationsService) {
    this.accomodations=[];
    this.accomodationsByUserId=[];
   }

  ngOnInit() {
    this.isAlreadyRes=false;
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.countriesService.getCountries().subscribe(
      (c: any) => {this.countries = c; console.log(this.countries)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    // this.roomsService.getRooms().subscribe(
    //   (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //ovde treba da se prosledi id usera koji je ulogovan
    this.roomReservationsService.getAccRes(1).subscribe(
      (a:any)=>{this.accomodationsByUserId=a;console.log(this.accomodationsByUserId)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

  }

  countrySelected()
  {
    this.countriesService.getCountryById(this.countryId).subscribe(
      c => {
        this.country = c as Country; 
        this.regions=[];
        this.places=[];
        this.accomodations=[];
        this.rooms=[];
        this.regions = this.country.Regions;
      });
  }

  isSelectedCountry() : boolean
  {
    return this.country != null;
  }

  regionSelected()
  {
    this.regionsService.getRegionById(this.regionId).subscribe(
      r => {
        this.region = r as Region; 
        this.places=[];
        this.accomodations=[];
        this.rooms=[];
        this.places = this.region.Places;
      });
  }

  isSelectedRegion() : boolean
  {
    return this.region != null;
  }

  placeSelected()
  {
    this.placesService.getPlaceById(this.placeId).subscribe(
      p => {
        this.place = p as Place; 
        this.accomodations=[];
        this.rooms=[];
        for(var i=0;i<this.place.Accomodations.length;i++){
          if(this.place.Accomodations[i].Approved==true){
            var pl=this.place.Accomodations[i] as Accomodation;
            this.accomodations.push(pl);
          }
        }
        //this.accomodations = this.place.Accomodations;
      });
  }

  isSelectedPlace() : boolean
  {
    return this.place != null;
  }

  accomSelected()
  {
    this.accomodationsService.getAccomodationById(this.accId).subscribe(
      a => {
        this.accomodation = a as Accomodation; 
        this.rooms=[];
        this.rooms = this.accomodation.Rooms;
      });
  }

  isSelectedAccomodation() : boolean
  {
    return this.accomodation != null;
  }

  addRoomReservation(newRoomReservation:RoomReservations,form:NgForm):void{

    this.roomsService.getRoomById(this.roomId).subscribe(
      t => {
        this.roomWithRes = t as Room; 
        this.Reservations=[];
        this.Reservations = this.roomWithRes.RoomReservations;
        //this.aaa=false;
      });

      setTimeout(()=>{
      for(var i=0;i<this.Reservations.length;i++){
        if(this.Reservations[i].StartDate<newRoomReservation.StartDate){
          if(this.Reservations[i].EndDate>=newRoomReservation.StartDate){
            this.isAlreadyRes=true;
           // break;
          }
          else{
            //this.isAlreadyRes=false;
          }
        }
        else if(this.Reservations[i].StartDate===newRoomReservation.StartDate){
          this.isAlreadyRes=true;
          //break;
        }
        else if(this.Reservations[i].StartDate<=newRoomReservation.EndDate){
          this.isAlreadyRes=true;
          //break;
        }
        else{
          //this.isAlreadyRes=false;
        }
      }

      if(this.isAlreadyRes){
      
        this.dataContainer.nativeElement.innerHTML = "Room is already reserved.";
        
    }
    else{
      newRoomReservation.RoomId=this.roomId;
      newRoomReservation.AppUserId=1; //ovo treba da bude id korisnika koji rezervise
      newRoomReservation.Timestamp=new Date(Date.now());
      this.roomReservationsService.postRoomReservation(newRoomReservation).subscribe(this.onPost);
      form.reset(); 
      this.dataContainer.nativeElement.innerHTML = "";

      setTimeout(()=>{
        this.roomReservations=[];
    //za refresh lista
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  },2000);

    }
    
    this.isAlreadyRes=false;

  }, 2000);
  
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }

  accForEditSelected(){
    this.accomodationsService.getAccomodationById(this.accIdEdit).subscribe(
      a=>{
        this.accForEdit=a as Accomodation;
        this.roomResByUserId=[];
      }
    );

    setTimeout(()=>{
      //ovo gde je kec treba da se prosledi id usera koji je ulogovan
      this.accomodationsService.getRoomReservations(this.accForEdit.Id,1).subscribe(
        (r:any)=>{this.roomResByUserId=r; console.log(this.roomResByUserId)},
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    },1000);
  }

  roomReservationSelected(){
    this.roomReservationsService.getRoomResById(this.roomReservationId).subscribe(
      r=>{
        this.roomResEdit=r as RoomReservations;

        this.StartDate=this.roomResEdit.StartDate;
        this.EndDate=this.roomResEdit.EndDate;
      }
    );
  }

  editReservation(newRes:RoomReservations,form:NgForm){
    this.roomResEdit.StartDate=newRes.StartDate;
      this.roomResEdit.EndDate=newRes.EndDate;
    this.roomsService.getRoomById(this.roomResEdit.RoomId).subscribe(
      t => {
        this.roomWithRes = t as Room; 
        this.Reservations=[];
        this.Reservations = this.roomWithRes.RoomReservations;
        //this.aaa=false;
      });

      setTimeout(()=>{
      for(var i=0;i<this.Reservations.length;i++){
        if(this.Reservations[i].StartDate<this.roomResEdit.StartDate){
          if(this.Reservations[i].EndDate>=this.roomResEdit.StartDate){
            this.isAlreadyRes2=true;
           // break;
          }
          else{
            //this.isAlreadyRes=false;
          }
        }
        else if(this.Reservations[i].StartDate===this.roomResEdit.StartDate){
          this.isAlreadyRes2=true;
          //break;
        }
        else if(this.Reservations[i].StartDate<=this.roomResEdit.EndDate){
          this.isAlreadyRes2=true;
          //break;
        }
        else{
          //this.isAlreadyRes=false;
        }
      }

      if(this.isAlreadyRes2){
      
        this.dataContainer2.nativeElement.innerHTML = "Room is already reserved.";
        
    }
    else{
      
      this.roomResEdit.Timestamp=new Date(Date.now());
      this.roomReservationsService.putRes(this.roomResEdit.Id,this.roomResEdit).subscribe(this.onPost);
      
      form.reset();
      this.StartDate=new Date(Date.now());
      this.EndDate=new Date(Date.now());
      this.roomReservationId=0;
      this.accIdEdit=0;
      this.dataContainer2.nativeElement.innerHTML = "";

      setTimeout(()=>{
      this.roomReservations=[];
    //za refresh lista
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },2000);
    }
    
    this.isAlreadyRes2=false;

  }, 2000);
    
}

accForDeleteSelected(){
  this.accomodationsService.getAccomodationById(this.accIdDelete).subscribe(
      a=>{
        this.accForDelete=a as Accomodation;
        this.deleteRoomResByUserId=[];
      }
    );

    setTimeout(()=>{
      //ovo gde je kec treba da se prosledi id usera koji je ulogovan
      this.accomodationsService.getRoomReservations(this.accForDelete.Id,1).subscribe(
        (r:any)=>{this.deleteRoomResByUserId=r; console.log(this.deleteRoomResByUserId)},
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    },1000);
}

roomResSelectedDelete(){
  this.roomReservationsService.getRoomResById(this.roomReservationDeleteId).subscribe(
      r=>{
        this.roomResForDelete=r as RoomReservations;
        var t=false;
        //this.StartDate=this.roomResEdit.StartDate;
        //this.EndDate=this.roomResEdit.EndDate;
      }
    );
}

deleteRoomReservation(){
  this.roomReservationsService.delete(this.roomResForDelete.Id).subscribe();
    this.accIdDelete=0;
    this.roomReservationDeleteId=0;

    setTimeout(()=>{
        this.roomReservations=[];
    //za refresh lista
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  },2000);
}

}