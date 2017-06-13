import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { PlaceComponent } from './place/place.component';
import { AppUserComponent } from './appUser/appUser.component';
import { AccomodationTypeComponent } from './accomodationType/accomodationType.component';
import { AccomodationComponent } from './accomodation/accomodation.component';

import {CountriesService} from './services/countries.service';
import { RegionsService } from './services/regions.service';
import { PlacesService } from './services/places.service';
import { AppUsersService } from './services/appUsers.service';
import { AccomodationTypesService } from './services/accomodationTypes.service';
import { AccomodationsService } from './services/accomodations.service';



const Routes = [
  {path: "country", component:CountryComponent},
  {path: "region",component:RegionComponent},
  {path: "place",component:PlaceComponent},
  {path:"appUser",component:AppUserComponent},
  {path:"accomodationType",component:AccomodationTypeComponent},
  {path:"accomodation",component:AccomodationComponent}
  //{path: '', redirectTo: "/country", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegionComponent,
    PlaceComponent,
    AppUserComponent,
    AccomodationTypeComponent,
    AccomodationComponent
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
    PlacesService,
    AppUsersService,
    AccomodationTypesService,
    AccomodationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
