import { Component, OnInit } from '@angular/core';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';


@Component({
  selector: 'app-accom-details',
  templateUrl: './accom-details.component.html',
  styleUrls: ['./accom-details.component.css']
})
export class AccomDetailsComponent implements OnInit {

  accomodationId: number;
  accomodation: Accomodation;
  accomodations: Accomodation[];

  placeName: string;

  constructor(private accommService:AccomodationsService, 
              private router: Router, private authService:AuthenticationService,
              private activatedRoute:ActivatedRoute ) {

                activatedRoute.params.subscribe(params => {this.accomodationId = params["Id"];});
               this.accomodation=new Accomodation();
              
            }

  ngOnInit() {
  }

}
