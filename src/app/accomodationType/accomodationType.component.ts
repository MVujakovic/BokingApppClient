import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { AccommodationType } from './accommodationType.model';
import { AccomodationTypesService } from '../services/accomodationTypes.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-accomodationType',
  templateUrl: './accomodationType.component.html',
  styleUrls: ['./accomodationType.component.css'],
  providers: [AccomodationTypesService]
})
export class AccomodationTypeComponent implements OnInit {

  accomodationTypes: AccommodationType[];

  constructor(private accomodationTypesService: AccomodationTypesService, private ref:ChangeDetectorRef) {
   }

  ngOnInit() {
    this.accomodationTypesService.getAccomodationTypes().subscribe(
      (c: any) => {this.accomodationTypes = c; console.log(this.accomodationTypes)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addAccomodationType(newAccomodationType:AccommodationType,form:NgForm):void{
    this.accomodationTypesService.postAccomodationType(newAccomodationType).subscribe(this.onPost);
    form.reset();
    //this.ref.detectChanges();
    //this.ref.markForCheck();
     //alert("Sad Radi!!");

     setTimeout(()=>{
       this.accomodationTypes=[];
       this.accomodationTypesService.getAccomodationTypes().subscribe(
      (c: any) => {this.accomodationTypes = c; console.log(this.accomodationTypes)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
     },1000);
    }

  onPost(res : any) : void{
    //alert("Post!");
    console.log(res.json());
    //this.ref.detectChanges();
    //this.ref.markForCheck();
  }
}
