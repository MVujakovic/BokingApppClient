import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Accomodation } from './accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accomodationType/accommodationType.model';
import { PlacesService } from '../services/places.service';
import { AccomodationTypesService } from '../services/accomodationTypes.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers: [AccomodationsService]
})
export class AccomodationComponent implements OnInit {

  accomodations: Accomodation[];
  Places:Place[];
  AccomodationTypes:AccommodationType;
  imageUrl:string;
  placeId:number;
  accTypeId:number;

  constructor( private accomodationsService: AccomodationsService,
  private placesService:PlacesService,
  private accomodationTypesService:AccomodationTypesService) {
   }

  ngOnInit() {
    //za prikaz smestaja bez soba
    // this.accomodationsService.getAccomodations().subscribe(
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //za prikaz smestaja sa sobama
    this.accomodationsService.getAccomodationsWithRooms().subscribe(
      (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.placesService.getPlaces().subscribe(
      (c: any) => {this.Places = c; console.log(this.Places)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.accomodationTypesService.getAccomodationTypes().subscribe(
      (c: any) => {this.AccomodationTypes = c; console.log(this.AccomodationTypes)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addAccomodation(newAccomodation:Accomodation,form:NgForm):void{
    newAccomodation.AccomodationTypeId=this.accTypeId;
    newAccomodation.PlaceId=this.placeId;
    newAccomodation.OwnerId=1;
     this.accomodationsService.postAccomodation(newAccomodation).subscribe(this.onPost);
    form.reset();
  }
  
  onPost(res : any) : void{
    //alert("Post!");
    console.log(res.json());
  }

}