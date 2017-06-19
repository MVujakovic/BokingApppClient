import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm, FormsModule} from '@angular/forms';
import { Comment } from './comment.model';
import { CommentsService } from '../services/comments.service';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { RoomReservatonsService } from '../services/roomReservations.service';
import { AuthenticationService } from '../services/auth.service';

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

  userId:number;

  isDisabled:boolean;
  comments: Comment[];
  accomodations: Accomodation[];
  accomodationId: number;
  appUserId:number;//odredjuje se na osnovu korisnika koji pise komentar

  //za edit
  Grade:String;
  Text:String;
  commentsByOwner:Comment[];
  commEdit:Comment;

  constructor(private commentsService: CommentsService,
  private accomodationsService: AccomodationsService,
  private roomReservationsService:RoomReservatonsService,
  private authService: AuthenticationService) {
    this.isDisabled=false;
   }

  ngOnInit() {
    this.userId=this.authService.getCurrentUserId();

    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //ovde treba da se prosledi id korisnika koji je ulogovan
    this.commentsService.getCommentsByUserId(this.userId).subscribe(
      (c: any) => {this.commentsByOwner = c; console.log(this.commentsByOwner)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //ovde ce kao parametar ici id usera koji hoce da pise komentar(koji je ulogovan)
    this.roomReservationsService.getAccomodations(this.userId).subscribe(
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
    newComment.AppUserId=this.userId;//id usera cemo preuzeti od korisnika koji pise komentar
    newComment.AccomodationId=this.accomodationId;
     this.commentsService.postComment(newComment).subscribe(this.onPost);
    form.reset(); 

    setTimeout(()=>{
    //ovde treba da se prosledi id korisnika koji je ulogovan
    this.commentsByOwner=[];
    this.commentsService.getCommentsByUserId(this.userId).subscribe(
      (c: any) => {this.commentsByOwner = c; console.log(this.commentsByOwner)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.comments=[];
    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }

  isValid(){
    return this.isDisabled;
  }

  editComment(newComment:Comment,form:NgForm):void{
    this.commEdit.Grade=newComment.Grade;
    this.commEdit.Text=newComment.Text;
    this.commentsService.putComment(this.commEdit.Id,this.commEdit).subscribe(this.onPost);
    form.reset();

    this.Grade="";
    this.Text="";

    setTimeout(()=>{
    //ovde treba da se prosledi id korisnika koji je ulogovan
    this.commentsByOwner=[];
    this.commentsService.getCommentsByUserId(this.userId).subscribe(
      (c: any) => {this.commentsByOwner = c; console.log(this.commentsByOwner)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.comments=[];
    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },2000);
  }

  onEditComment(comm:Comment){
    this.Grade=comm.Grade.toString();
    this.Text=comm.Text;
    this.commEdit=comm;
  }

  onDeleteComment(comm:Comment){
    this.commentsService.delete(comm.Id).subscribe(this.onDeleteComment);

    setTimeout(()=>{
    //ovde treba da se prosledi id korisnika koji je ulogovan
    this.commentsByOwner=[];
    this.commentsService.getCommentsByUserId(this.userId).subscribe(
      (c: any) => {this.commentsByOwner = c; console.log(this.commentsByOwner)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    this.comments=[];
    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
    },1000);
  }
}