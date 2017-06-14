import { Component, OnInit } from '@angular/core';
import {Place} from './place.model';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { PlacesService } from '../services/places.service';
import { Region } from '../region/region.model';
import { RegionsService } from '../services/regions.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [PlacesService]
})
export class PlaceComponent implements OnInit {

  places: Place[];
  regions: Region[];
  regionId: number;

  constructor(private placesService: PlacesService,
  private regionsService: RegionsService) {
    
   }

  ngOnInit() {
    //ovo je za prikaz places sa regionima
    // this.placesService.getPlaces().subscribe(
    //   (c: any) => {this.places = c; console.log(this.places)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //Ovo je za prikaz places sa smestajima
    this.placesService.getPlacesWithAcc().subscribe(
      (c: any) => {this.places = c; console.log(this.places)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih regiona; mozda bi se prvo trebala odabrati country,
    //pa na osnovu zemlje da se ponude regioni za biranje
    this.regionsService.getRegions().subscribe(
      (c: any) => {this.regions = c; console.log(this.regions)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addPlace(newPlace:Place,form:NgForm):void{
    newPlace.RegionId=this.regionId;
     this.placesService.postPlace(newPlace).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}