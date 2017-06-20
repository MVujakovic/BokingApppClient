import { Component, OnInit, Input } from '@angular/core';
import { Accomodation } from '../accomodation/accomodation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccomodationsService } from '../services/accomodations.service';
import { Place } from '../place/place.model';
import { AccommodationType } from '../accomodationType/accommodationType.model';
import { User } from '../user/user.model';
import { AppUser } from '../appUser/appUser.model';


@Component({
  selector: 'showAccomodation',
  templateUrl: './showAccomodation.component.html',
  styleUrls: ['./showAccomodation.component.css'],
  providers: [AccomodationsService]
})

export class ShowAccommodationComponent implements OnInit {
    accommodationId: number;
    accommodation: Accomodation;
    accommodations: Accomodation[];
    placeName: string;
    //name:string;
    accoms:Accomodation[];

    constructor(private accommodationService: AccomodationsService, private router: Router, private activatedRoute: ActivatedRoute,
    ) { 

    activatedRoute.params.subscribe(params => {this.accommodationId = params["Id"];});

    this.accoms=[];
    this.accommodation = new Accomodation();
    this.accommodation.Owner = new AppUser();
    this.accommodation.Place = new Place();
    this.accommodation.AccomodationType = new AccommodationType();
  }

  ngOnInit() {
      

     this.accommodationService.getAccomodationById(this.accommodationId).subscribe(
      (a:any)=>{
        
        this.accommodation=undefined;
        this.accommodation=a as Accomodation;
        //this.name=this.accommodation.Name.toString();
        console.log(this.accommodation);},
        
      //var d=true;},
      
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
     );

     setTimeout(()=>{
      this.accoms=[];
      this.accoms.push(this.accommodation);
     },1000);
     
    //   this.accommodationService.getAccomodationById(this.accommodationId).subscribe(x => {
    //      this.accommodations = x.json();
    //     this.accommodation = this.accommodations[0];
    // });

  } 

}
