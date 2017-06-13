import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Accomodation } from './accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
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

  accomodations: Accomodation[];
  imageUrl:string;

  constructor( private accomodationsService: AccomodationsService) {
   }

  ngOnInit() {
    //za prikaz smestaja bez soba
    // this.accomodationsService.getAccomodations().subscribe(
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

    //za prikaz smestaja sa sobama
    this.accomodationsService.getAccomodationsWithRooms().subscribe(
      (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addAccomodation(newAccomodation:Accomodation,form:NgForm):void{
     this.accomodationsService.postAccomodation(newAccomodation).subscribe(this.onPost);
    form.reset();
  }
  
  onPost(res : any) : void{
    //alert("Post!");
    console.log(res.json());
  }
}