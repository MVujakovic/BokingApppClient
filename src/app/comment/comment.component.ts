import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm, FormsModule} from '@angular/forms';
import { Comment } from './comment.model';
import { CommentsService } from '../services/comments.service';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { RoomReservatonsService } from '../services/roomReservations.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentsService,AccomodationsService,RoomReservatonsService]
})
export class CommentComponent implements OnInit {
  @ViewChild('dataContainer') dataContainer: ElementRef;

  isDisabled:boolean;
  comments: Comment[];
  accomodations: Accomodation[];
  accomodationId: number;
  appUserId:number;//odredjuje se na osnovu korisnika koji pise komentar

  constructor(private commentsService: CommentsService,
  private accomodationsService: AccomodationsService,
  private roomReservationsService:RoomReservatonsService) {
    this.isDisabled=false;
   }

  ngOnInit() {
    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //ovde ce kao parametar ici id usera koji hoce da pise komentar
    this.roomReservationsService.getAccomodations(3).subscribe(
      (c: any) => {
        this.accomodations = c; 
        console.log(this.accomodations);
        
      },//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    // this.accomodationsService.getAccomodations().subscribe(
    //   (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
    setTimeout(()=>{
      if (this.accomodations.length==0){
          this.dataContainer.nativeElement.innerHTML="You can only comment accomodations after you've stayed in them.";
          //Napisati ovaj komentar lepse :D
          this.isDisabled=true;
        }
        else{
          this.dataContainer.nativeElement.innerHTML="";
          this.isDisabled=false;
        }
    },3000);
    
  }

  addComment(newComment:Comment,form:NgForm):void{
    //Korisnik može oceniti smeštaj i ostaviti komentar o njemu, ali nakon boravka u smeštaju.
    //To je odradjeno :)
    newComment.AppUserId=1;//id usera cemo preuzeti od korisnika koji pise komentar
    newComment.AccomodationId=this.accomodationId;
     this.commentsService.postComment(newComment).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }

  isValid(){
    return this.isDisabled;
  }
}