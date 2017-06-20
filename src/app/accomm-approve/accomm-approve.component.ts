import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AccomodationsService } from '../services/accomodations.service';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accomodationType/accommodationType.model';
import { PlacesService } from '../services/places.service';
import { AccomodationTypesService } from '../services/accomodationTypes.service';
import { AuthenticationService } from '../services/auth.service';
import { Accomodation } from '../accomodation/accomodation.model';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-accomm-approve',
  templateUrl: './accomm-approve.component.html',
  styleUrls: ['./accomm-approve.component.css']
})
export class AccommApproveComponent implements OnInit {

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
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //za prikaz smestaja sa sobama
    this.accomodationsService.getAccomodationsWithRooms().
      subscribe(
      (a: any) => {
        this.accomodations = a;
        console.log(this.accomodations)
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
      );

    this.placesService.getPlaces().
      subscribe(
      (p: any) => {
        this.Places = p;
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
  }
  onEdit(acc: Accomodation) {
    this.dataContainer.nativeElement.innerHTML = acc.Name;

    this.Approved = acc.Approved;
    this.accom = acc;
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    console.log(this.file);
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


}