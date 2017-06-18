import { Component, OnInit } from '@angular/core';
import {Region} from './region.model';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { RegionsService } from '../services/regions.service';
import { Country } from '../country/country.model';
import { CountriesService } from '../services/countries.service';
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
  countries: Country[];
  countryId:number;

  constructor( private regionsService: RegionsService,
  private countriesService:CountriesService) {
   }

  ngOnInit() {
    this.regionsService.getRegions().subscribe(
      (c: any) => {this.regions = c; console.log(this.regions)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih zemalja
    this.countriesService.getCountries().subscribe(
      (c: any) => {this.countries = c; console.log(this.countries)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addRegion(newRegion:Region,form:NgForm):void{
    newRegion.CountryId=this.countryId;
     this.regionsService.postRegion(newRegion).subscribe(this.onPost);
    form.reset();

    setTimeout(()=>{
      this.regions=[];
      this.regionsService.getRegions().subscribe(
      (c: any) => {this.regions = c; console.log(this.regions)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }
  
  onPost(res : any) : void{
    //alert("Post!");
    console.log(res.json());
  }
}