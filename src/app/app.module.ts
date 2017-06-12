import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { PlaceComponent } from './place/place.component';

import {CountriesService} from './services/countries.service';
import { RegionsService } from './services/regions.service';
import { PlacesService } from './services/places.service';


const Routes = [
  {path: "country", component:CountryComponent},
  {path: "region",component:RegionComponent},
  {path: "place",component:PlaceComponent},
  //{path: '', redirectTo: "/country", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegionComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule,
    HttpModule,
    JsonpModule   
  ],
  providers: [
    CountriesService,
    RegionsService,
    PlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
