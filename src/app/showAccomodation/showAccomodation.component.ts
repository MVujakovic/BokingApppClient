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

    constructor(private accommodationService: AccomodationsService, private router: Router, private activatedRoute: ActivatedRoute,
    ) { 

    activatedRoute.params.subscribe(params => {this.accommodationId = params["Id"];});

    this.accommodation = new Accomodation();
    this.accommodation.Owner = new AppUser();
    this.accommodation.Place = new Place();
    this.accommodation.AccomodationType = new AccommodationType();
  }

  ngOnInit() {
      
     
      this.accommodationService.getAccomodationById(this.accommodationId).subscribe(x => { this.accommodations = x.json();
        this.accommodation = this.accommodations[0];
    });

  } 

}
