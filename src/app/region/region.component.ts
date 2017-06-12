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
    new Region(1,"Srem",1),
    new Region(2,"Banat",1),
    new Region(3,"Backa",1)
    ];
   }

  ngOnInit() {
  }

  addRegion(newRegion:Region):void{
     alert("Sad Radi!!"); 
    }
}