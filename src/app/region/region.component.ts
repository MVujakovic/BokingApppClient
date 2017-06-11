import { Component, OnInit } from '@angular/core';
import {Region} from './region.model'

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  //template: `<h1>Sad radi</h1>`,
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[];

  constructor() {
    this.regions=[
    new Region(1,"Srem"),
    new Region(2,"Banat"),
    new Region(3,"Backa")
    ];
   }

  ngOnInit() {
  }

  addRegion(newRegion:Region):void{
     alert("Sad Radi!!"); 
    }
}