import { Component, OnInit } from '@angular/core';
import {Region} from './region.model';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { RegionsService } from '../services/regions.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionsService]
})
export class RegionComponent implements OnInit {

  regions: Region[];

  constructor( private regionsService: RegionsService) {
   }

  ngOnInit() {
    this.regionsService.getRegions().subscribe(
      (c: any) => {this.regions = c; console.log(this.regions)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addRegion(newRegion:Region,form:NgForm):void{
     this.regionsService.postRegion(newRegion).subscribe(this.onPost);
    form.reset();
  }
  
  onPost(res : any) : void{
    //alert("Post!");
    console.log(res.json());
  }
}