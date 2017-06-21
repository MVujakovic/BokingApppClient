import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Accomodation } from './accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accomodationType/accommodationType.model';
import { PlacesService } from '../services/places.service';
import { AccomodationTypesService } from '../services/accomodationTypes.service';
import { AuthenticationService } from '../services/auth.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers: [AccomodationsService]
})
export class AccomodationComponent implements OnInit {
  @ViewChild('dataContainer') dataContainer: ElementRef;

  file: File;
  userId: number;

  accomodations: Accomodation[];
  Places: Place[];
  AccomodationTypes: AccommodationType;
  imageUrl: string;
  placeId: number;
  accTypeId: number;
  //Approved:string;
  Approved: boolean;
  accName: string = '';
  accom: Accomodation;


  //za edit
  accomByOwner: Accomodation[];
  accomEdit: Accomodation;
  Name: String;
  Description: String;
  Address: String;
  AverageGrade: String;
  Latitude: String;
  Longitude: String;
  ImageEdit: string;
  PlaceIdEdit: number;
  AccomodationTypeIdEdit: number;


  constructor(private accomodationsService: AccomodationsService,
    private placesService: PlacesService,
    private accomodationTypesService: AccomodationTypesService,
    private authService: AuthenticationService) {
  }

  ngOnInit() {

    this.userId = this.authService.getCurrentUserId();
    //za prikaz smestaja bez soba
    // this.accomodationsService.getAccomodations().subscribe(
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //za prikaz smestaja sa sobama
    this.accomodationsService.getAccomodationsWithRooms().
      subscribe(
      (c: any) => {
        this.accomodations = c;
        console.log(this.accomodations)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
      );

    this.placesService.getPlaces().
      subscribe(
      (c: any) => {
        this.Places = c;
        console.log(this.Places)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
      );

    this.accomodationTypesService.getAccomodationTypes().
      subscribe(
      (c: any) => {
        this.AccomodationTypes = c;
        console.log(this.AccomodationTypes)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
      );

    
   
    this.accomodationsService.getAccomodationsByOwnerId(this.userId).
      subscribe((c: any) => {
        this.accomByOwner = c;
        console.log(this.accomByOwner)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
      );
  }


  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    console.log(this.file);
  }

  addAccomodation(newAccomodation: Accomodation, form: NgForm): void {

    newAccomodation.AccomodationTypeId = this.accTypeId;
    newAccomodation.PlaceId = this.placeId;
    newAccomodation.OwnerId = this.userId;
    this.accomodationsService.postAccomodation(newAccomodation).
      subscribe(this.onPost);

    form.reset();

    setTimeout(() => {
      this.accomodations = [];
      this.accomodationsService.getAccomodationsWithRooms().
        subscribe(
        (c: any) => {
          this.accomodations = c;
          console.log(this.accomodations)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
        );

      this.accomByOwner = [];
      this.accomodationsService.getAccomodationsByOwnerId(this.userId).
        subscribe(
        (c: any) => {
          this.accomByOwner = c;
          console.log(this.accomByOwner)
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
  }

  putAccomodation(newAccomodation: Accomodation, form: NgForm): void {

    this.accom.Approved = newAccomodation.Approved;
    this.accomodationsService.putAccomodation(this.accom.Id, this.accom).subscribe(this.onPost);
    this.Approved = false;
    this.dataContainer.nativeElement.innerHTML = "";


    setTimeout(() => {
      //za refresh lista
      this.accomodations = [];
      this.accomodationsService.getAccomodationsWithRooms().
        subscribe(
        (c: any) => {
          this.accomodations = c; console.log(this.accomodations)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
        );

      this.accomByOwner = [];
      this.accomodationsService.getAccomodationsByOwnerId(this.userId).
        subscribe(
        (c: any) => {
          this.accomByOwner = c; console.log(this.accomByOwner)
        },//You can set the type to Country
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
        );
    }, 1000);
  }

  onEdit(acc: Accomodation) {
    // if(acc.Approved){
    //   this.Approved="true";
    // }
    // else{
    //   this.Approved="false;"
    // }
    this.dataContainer.nativeElement.innerHTML = acc.Name;

    this.Approved = acc.Approved;
    this.accom = acc;
  }

  editAccomodation(newAccomodation: Accomodation, form: NgForm): void {
    this.accomEdit.Name = newAccomodation.Name;
    this.accomEdit.Address = newAccomodation.Address;
    this.accomEdit.AverageGrade = newAccomodation.AverageGrade;
    this.accomEdit.Description = newAccomodation.Description;
    this.accomEdit.Latitude = newAccomodation.Latitude;
    this.accomEdit.Longitude = newAccomodation.Longitude;
    this.accomEdit.PlaceId = this.PlaceIdEdit;
    this.accomEdit.AccomodationTypeId = this.AccomodationTypeIdEdit;
    this.accomodationsService.putAccomodation(this.accomEdit.Id, this.accomEdit).subscribe(this.onPost);

    // newAccomodation.AccomodationTypeId=this.AccomodationTypeIdEdit;
    // newAccomodation.PlaceId=this.PlaceIdEdit;
    // newAccomodation.OwnerId=this.accomEdit.OwnerId;
    // this.accomodationsService.putAccomodation(this.accomEdit.Id,newAccomodation).subscribe(this.onPost);
    form.reset();

    this.Name = "";
    this.Description = "";
    this.Address = "";
    this.AverageGrade = "";
    this.Latitude = "";
    this.Longitude = "";
    this.PlaceIdEdit = 0;
    this.AccomodationTypeIdEdit = 0;

    setTimeout(() => {
      this.accomodations = [];
      this.accomodationsService.getAccomodationsWithRooms().
        subscribe(
        (c: any) => {
          this.accomodations = c; console.log(this.accomodations)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
        );

      this.accomByOwner = [];
      this.accomodationsService.getAccomodationsByOwnerId(this.userId).
        subscribe(
        (c: any) => {
          this.accomByOwner = c;
          console.log(this.accomByOwner)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
        );
    }, 1000);
  }

  onEditAccomodation(acc: Accomodation) {
    this.Name = acc.Name;
    this.Description = acc.Description;
    this.Address = acc.Address;
    this.AverageGrade = acc.AverageGrade.toString();
    this.Latitude = acc.Latitude.toString();
    this.Longitude = acc.Longitude.toString();
    this.PlaceIdEdit = acc.PlaceId;
    this.AccomodationTypeIdEdit = acc.AccomodationTypeId;
    this.accomEdit = acc;
  }

  onDeleteAccomodation(acc: Accomodation) {
    this.accomodationsService.delete(acc.Id).subscribe(this.onDeleteAccomodation);

    setTimeout(() => {
      //za refresh lista
      this.accomodations = [];
      this.accomodationsService.getAccomodationsWithRooms().subscribe(
        (c: any) => {
          this.accomodations = c;
          console.log(this.accomodations)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
      );

      this.accomByOwner = [];
      this.accomodationsService.getAccomodationsByOwnerId(this.userId).subscribe(
        (c: any) => {
          this.accomByOwner = c;
          console.log(this.accomByOwner)
        },
        error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
        }
      );
    }, 1000);
  }

}