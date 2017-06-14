import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Comment } from './comment.model';
import { CommentsService } from '../services/comments.service';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentsService]
})
export class CommentComponent implements OnInit {

  comments: Comment[];
  accomodations: Accomodation[];
  accomodationId: number;
  appUserId:number;//odredjuje se na osnovu korisnika koji pise komentar

  constructor(private commentsService: CommentsService,
  private accomodationsService: AccomodationsService) {
    
   }

  ngOnInit() {
    this.commentsService.getComments().subscribe(
      (c: any) => {this.comments = c; console.log(this.comments)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );

    //za dobavljanje svih smestaja; mozda bi se prvo trebalo odabrati country,region i grad,
    //pa na osnovu toga odabrati smestaj
    this.accomodationsService.getAccomodations().subscribe(
      (c: any) => {this.accomodations = c; console.log(this.accomodations)},//You can set the type to Country
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  addComment(newComment:Comment,form:NgForm):void{
    newComment.AppUserId=1;//id usera cemo preuzeti od korisnika koji pise komentar
    newComment.AccomodationId=this.accomodationId;
     this.commentsService.postComment(newComment).subscribe(this.onPost);
    form.reset(); 
  }
  
  onPost(res : any) : void{
    console.log(res.json());
  }
}