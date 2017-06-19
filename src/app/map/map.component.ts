import { Component, OnInit, Input } from '@angular/core';
import {MapInfo} from './map-info.model'
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 600px; width: 900px;}'] //postavljamo sirinu i visinu mape
})
export class MapComponent implements OnInit {

  defaultInfo : MapInfo;
  accomodationsMapInfo: MapInfo[] = [];
  accomodations : Accomodation[] = [];

  s:string;
  s2:string;

  constructor(private accomodationService: AccomodationsService) { 
      
      this.defaultInfo = new MapInfo(45.242268, 
                                    19.842954, 
                                    "assets/ftn.png",
                                    "Jugodrvo" , 
                                    "" , 
                                    "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
  }

  private getAccommodations() : void {
        this.accomodationService.getAccomodations().subscribe(
            (a:any)=>{this.accomodations=a;console.log(this.accomodations);this.doMapping();},
            error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );


        
    }      

  private doMapping() : void {
        
        //debugger
        for(let accommodation of this.accomodations) {
            var mapInfo : MapInfo;
            
            this.s=accommodation.Name.toString();
            this.s2=accommodation.Place.Name.toString();
            
            mapInfo = new MapInfo(accommodation["Latitude"],
                                  accommodation["Longitude"],
                                  "assets/ftn.png",
                                  this.s2 , 
                                  this.s , 
                                  "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

            this.accomodationsMapInfo.push(mapInfo);
        }
  }

  ngOnInit() : void {
        this.getAccommodations();
  }
}
