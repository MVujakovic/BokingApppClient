import { Component, OnInit } from '@angular/core';
import {Place} from './place.model'

@Component({
  selector: 'app-region',
  templateUrl: './place.component.html',
  //template: `<h1>Sad radi</h1>`,
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  regions: Place[];

  constructor() {
    
   }

  ngOnInit() {
  }

  addPlace(newRegion:Place):void{
     alert("Sad Radi!!"); 
    }
}