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
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';
import { RoomComponent } from './room/room.component';
import { RoomReservationsComponent } from './roomReservations/roomReservations.component';

import {CountriesService} from './services/countries.service';
import { RegionsService } from './services/regions.service';
import { PlacesService } from './services/places.service';
import { AppUsersService } from './services/appUsers.service';
import { AccomodationTypesService } from './services/accomodationTypes.service';
import { AccomodationsService } from './services/accomodations.service';
import { RegisterService } from './services/register.service';
import { LogInService } from './services/login.service';
import { ComponentFixture } from '@angular/core/testing';
import { CommentsService } from './services/comments.service';
import { RoomsService } from './services/rooms.service';
import { RoomReservatonsService } from './services/roomReservations.service';



const Routes = [
  {path: "country", component:CountryComponent},
  {path: "region",component:RegionComponent},
  {path: "place",component:PlaceComponent},
  {path:"appUser",component:AppUserComponent},
  {path:"accomodationType",component:AccomodationTypeComponent},
  {path:"accomodation",component:AccomodationComponent},
  {path:"comment",component:CommentComponent},
  {path:"room",component:RoomComponent},
  {path:"roomReservations",component:RoomReservationsComponent},
  {path:"Register",component:RegisterComponent},
  {path:"Login",component:LoginComponent},
  {path: '',redirectTo:'/bookingApp',pathMatch: 'full'},
  {path:"bookingApp", component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegionComponent,
    PlaceComponent,
    AppUserComponent,
    AccomodationTypeComponent,
    AccomodationComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    CommentComponent,
    RoomComponent,
    RoomReservationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule,
    HttpModule,
    JsonpModule   
  ],
  // kasnije cemo da sredimo ove provajdere, da vidimo sta gde treba da bude dostupno, da ne bude sve u appmodule
  providers: [
    CountriesService,
    RegionsService,
    PlacesService,
    AppUsersService,
    AccomodationTypesService,
    AccomodationsService,
    RegisterService,
    LogInService,
    CommentsService,
    RoomsService,
    RoomReservatonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
