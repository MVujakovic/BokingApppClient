import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
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

  constructor(private roomReservationsService: RoomReservatonsService,
  private roomsService: RoomsService,
  private countriesService:CountriesService,
  private regionsService:RegionsService,
  private placesService:PlacesService,
  private accomodationsService:AccomodationsService) {
    this.accomodations=[];
   }

  ngOnInit() {
    this.isAlreadyRes=false;
    this.roomReservationsService.getRoomReservations().subscribe(
      (c: any) => {this.roomReservations = c; console.log(this.roomReservations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih soba bi se prvo trebala odabrati country,
    //regija,grad i smestaj
    this.countriesService.getCountries().subscribe(
      (c: any) => {this.countries = c; console.log(this.countries)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    // this.roomsService.getRooms().subscribe(
    //   (c: any) => {this.rooms = c; console.log(this.rooms)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

  }

  countrySelected()
  {
    this.countriesService.getCountryById(this.countryId).subscribe(
      c => {
        this.country = c as Country; 
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
        this.Reservations = this.roomWithRes.RoomReservations;
        this.aaa=false;
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
    }
    
    this.isAlreadyRes=false;

    }, 3000);
    
    // this.Reservations.forEach(eachObj=>{
    //   if(eachObj.StartDate<newRoomReservation.StartDate){
    //     if(eachObj.EndDate>=newRoomReservation.StartDate){
    //       this.isAlreadyRes=true;
    //     }
    //     else{
    //       this.isAlreadyRes=false;
    //     }
    //   }
    //   else if(eachObj.StartDate==newRoomReservation.StartDate){
    //     this.isAlreadyRes=true;
    //   }
    //   else if(eachObj.StartDate<=newRoomReservation.EndDate){
    //     this.isAlreadyRes=true;
    //   }
    //   else{
    //     this.isAlreadyRes=false;
    //   }
      
    // });
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}