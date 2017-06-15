import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm, FormsModule} from '@angular/forms';
import { AccomodationsService } from '../services/accomodations.service';
import { RoomsService } from '../services/rooms.service';
import { CountriesService } from '../services/countries.service';
import { RegionsService } from '../services/regions.service';
import { PlacesService } from '../services/places.service';
import { Country } from '../country/country.model';
import { Region } from '../region/region.model';
import { Place } from '../place/place.model';
import { Accomodation } from '../accomodation/accomodation.model';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [AccomodationsService,RoomsService,CountriesService,RegionsService,PlacesService]
})
export class SearchComponent implements OnInit {
  //@ViewChild('dataContainer') dataContainer: ElementRef;

  countries:Country[];
  regions:Region[];
  places:Place[];
  accomodations:Accomodation[];
  accFromPlace:Accomodation[]
  accFromGrade:Accomodation[];
  country:Country;
  countryId:number;
  region:Region;
  regionId:number;
  place:Place;
  placeId:number;
  grades:string[];
  grade:string;
  gradeNumber:number;

  constructor(
  private accomodationsService: AccomodationsService,
  private roomsService:RoomsService,
  private countriesService:CountriesService,
  private regionsService:RegionsService,
  private placesService:PlacesService) {
      this.accomodations=[];
      this.accFromPlace=[];
      this.accFromGrade=[];
      this.grades=[];
      this.grades.push("0-1");
      this.grades.push("1-2");
      this.grades.push("2-3");
      this.grades.push("3-4");
      this.grades.push("4-5");
   }

  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      (c: any) => {this.countries = c; console.log(this.countries)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  
  onPost(res : any) : void{
    console.log(res.json());
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
            console.log(pl);
            this.accFromPlace.push(pl);
            this.accomodations.push(pl);
          }
        }
      });
  }

  isSelectedPlace() : boolean
  {
    return this.place != null;
  }

  gradeSelected()
  {
      while(this.accomodations.length!=0){
        this.accomodations.pop();
      }
      
    //   for(var k=0;k<this.accFromPlace.length;k++){
    //       this.accomodations.push(this.accFromPlace[k]);
    //   }

      switch(this.grade){
          case "0-1":{
            this.gradeNumber=1;
            break;
          }
          case "1-2":{
            this.gradeNumber=2;
            break;
          }
          case "2-3":{
            this.gradeNumber=3;
            break;
          }
          case "3-4":{
            this.gradeNumber=4;
            break;
          }
          case "4-5":{
            this.gradeNumber=5;
            break;
          }
      }

      this.accomodationsService.getAccomodationsByGrade(this.gradeNumber).subscribe(
      (c: any) => {this.accFromGrade = c; console.log(this.accFromGrade)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    setTimeout(()=>{
        if(this.accFromGrade.length!=0){
            for(var j=0;j<this.accFromPlace.length;j++){     
            var exists=false;
            for(var i=0;i<this.accFromGrade.length;i++){
                if(this.accFromGrade[i].Id==this.accFromPlace[j].Id){
                    exists=true;
                    this.accomodations.push(this.accFromGrade[i]);
                    break;
                }
                // if(i==this.accFromGrade.length-1){
                //     if(exists==false){
                //         var index = this.accomodations.indexOf(this.accFromPlace[j]);
                //         if (index > -1) {

                //             //this.accomodations.splice(index, 1);
                //         }                    
                //     }
                // }
            }
            }
        }
        // else{
        //     while(this.accomodations.length!=0){
        //         this.accomodations.pop();
        //     }
        // }
        
    },1000);
  }

  onEdit(acc:Accomodation){

  }

}