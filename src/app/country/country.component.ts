import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Country } from './country.model';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../services/countries.service'
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [CountriesService]
})
export class CountryComponent implements OnInit {

  countries: Country[];

  constructor(private countriesService: CountriesService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.countriesService.getCountries().subscribe(
      (c: any) => {
        this.countries = c;
        console.log(this.countries)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
    );
  }

  addCountry(newCountry: Country, form: NgForm): void {
    this.countriesService.postCountry(newCountry).subscribe(this.onPost);
    form.reset();
    //this.ref.detectChanges();
    //this.ref.markForCheck();
    //alert("Sad Radi!!");

    setTimeout(() => {
      this.countries = [];
      this.countriesService.getCountries().subscribe(
        (c: any) => {
          this.countries = c;
          console.log(this.countries)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
      );
    }, 1000);
  }

  onPost(res: any): void {
    //alert("Post!");
    console.log(res.json());
    //this.ref.detectChanges();
    //this.ref.markForCheck();
  }
}
