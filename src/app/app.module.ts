import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

import { AppUserComponent } from './appUser/appUser.component';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from './region/region.component';
import { PlaceComponent } from './place/place.component';
import { AccomodationTypeComponent } from './accomodationType/accomodationType.component';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { CommentComponent } from './comment/comment.component';
import { RoomComponent } from './room/room.component';
import { RoomReservationsComponent } from './roomReservations/roomReservations.component';
import { SearchComponent } from './search/search.component';
import { FilteredAccommodationsComponent } from './filtered-acc/filtered-acc.component';
import { FilterFormComponent } from './filter-form/filter-form.component';

import { AuthenticationService } from './services/auth.service';
import { LogInService } from './services/login.service';
import { RegisterService } from './services/register.service';

import { AppUsersService } from './services/appUsers.service';
import { CountriesService } from './services/countries.service';
import { RegionsService } from './services/regions.service';
import { PlacesService } from './services/places.service';
import { AccomodationTypesService } from './services/accomodationTypes.service';
import { AccomodationsService } from './services/accomodations.service';
import { RoomsService } from './services/rooms.service';
import { RoomReservatonsService } from './services/roomReservations.service';
import { CommentsService } from './services/comments.service';

// RECOMMENDED (doesn't work with system.js)
import { CarouselModule } from 'ngx-bootstrap/carousel';
// or
//import { CarouselModule } from 'ngx-bootstrap';

import { ComponentFixture } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AgmCoreModule } from '@agm/core';


// import { AlertModule } from 'ngx-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { ShowAccommodationComponent } from './showAccomodation/showAccomodation.component';
import { AccommApproveComponent } from './accomm-approve/accomm-approve.component';
import { AccomDetailsComponent } from './accom-details/accom-details.component';




// localhost:4200/dashboard/path
const ChildRoutesDashboard = [
  { path: "country", component: CountryComponent },
  { path: "region", component: RegionComponent },
  { path: "place", component: PlaceComponent },
  { path: "accomtype", component: AccomodationTypeComponent },
  { path: "accom", component: AccomodationComponent },
  { path: "accomApprove", component: AccommApproveComponent },
  { path: "room", component: RoomComponent },
  { path: "comments", component: CommentComponent },
  { path: "manageReservations", component: RoomReservationsComponent },
  { path: "accom/accomDetails/:Id",component:AccomDetailsComponent}
]

// localhost:4200/bookingApp/path
const ChildRoutesHome = [
  //  { path: "login", component: LoginComponent },
  //  { path: "register", component: RegisterComponent },
  { path: "showAccomodation/:Id", component: ShowAccommodationComponent },
  { path: "appUser", component: AppUserComponent },
  { path: "accomodationType", component: AccomodationTypeComponent },
  { path: "accomodation", component: AccomodationComponent, canActivate: [AuthGuard] },
  { path: "room", component: RoomComponent },
  { path: "roomReservations", component: RoomReservationsComponent },
  { path: "comment", component: CommentComponent },

]

// na njih navigiramo kroz localhost:4200/path
const Routes = [
  { path: '', redirectTo: '/bookingApp', pathMatch: 'full' },
  { path: "other", redirectTo: "/bookingApp" },
  { path: "bookingApp", component: HomeComponent, children: ChildRoutesHome },
  { path: "dashboard", component: DashboardComponent, children: ChildRoutesDashboard },

  { path: "myReservations", component: RoomReservationsComponent },

  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "userDetails", component: UserComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppUserComponent,
    CountryComponent,
    RegionComponent,
    PlaceComponent,
    AccomodationTypeComponent,
    AccomodationComponent,
    UserComponent,
    RoomReservationsComponent,
    RoomComponent,
    CommentComponent,
    SearchComponent,
    CarouselComponent,
    DashboardComponent,
    MapComponent,
    FilteredAccommodationsComponent,
    FilterFormComponent,
    ShowAccommodationComponent,
    AccommApproveComponent,
    AccomDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    // AlertModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    HttpModule,
    JsonpModule,
    //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk' })
  ],


  // kasnije cemo da sredimo ove provajdere, 
  // da vidimo sta gde treba da bude dostupno, da ne bude sve u appmodule
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
    AuthenticationService,
    RoomReservatonsService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
