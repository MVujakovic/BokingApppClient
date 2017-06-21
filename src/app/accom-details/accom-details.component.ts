import { Component, OnInit } from '@angular/core';
import { Accomodation } from '../accomodation/accomodation.model';
import { AccomodationsService } from '../services/accomodations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Room } from '../room/room.model';


@Component({
  selector: 'app-accom-details',
  templateUrl: './accom-details.component.html',
  styleUrls: ['./accom-details.component.css']
})
export class AccomDetailsComponent implements OnInit {

  roomsByAccomodation: Room[];
  accomodationId: number;
  accomodation: Accomodation;
  accomodations: Accomodation[];
  RoomNumber: String;
  BedCount: String;
  Description: String;
  PricePerNight: String;
  placeName: string;

  constructor(private accomodationsService: AccomodationsService,
    private router: Router, private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(params => { this.accomodationId = params["Id"]; });
    this.accomodation = new Accomodation();

  }

  ngOnInit() {

    this.accomodationsService.getAccomodationById(this.accomodationId).subscribe(
      a => {
        this.accomodation = a as Accomodation;
        // this.roomsByAccomodation = [];
        this.roomsByAccomodation = this.accomodation.Rooms;
        // this.RoomNumber = "";
        // this.BedCount = "";
        // this.Description = "";
        // this.PricePerNight = "";
      });
  }
}
