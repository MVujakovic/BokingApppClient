import { Component, OnInit } from '@angular/core';
import {Country} from './country.model';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { CountriesService } from '../services/countries.service'

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountriesService]
})
export class CountryComponent implements OnInit {


  countries: Country[]; //mozda treba object

  constructor(private countriesService: CountriesService) {
   
   }

  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      (c: any) => {this.countries = c; console.log(this.countries)},//You can set the type to Product.
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addCountry(newCountry:Country,form:NgForm):void{
    this.countriesService.postCountry(newCountry).subscribe(this.onPost);
    form.reset();
     //alert("Sad Radi!!");
    }

  onPost(res : any) : void{
    alert("Post!");
    console.log(res.json());
  }
}
