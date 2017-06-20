import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Accomodation } from '../accomodation/accomodation.model';
import { PagingService } from '../services/paging.service';
import { FilteredAccommodationsService } from '../services/filtered-acc.service';

@Component({
  selector: 'app-filtered-acc',
  templateUrl: './filtered-acc.component.html',
  styleUrls: ['./filtered-acc.component.css'],
  providers: [FilteredAccommodationsService, PagingService]
})

export class FilteredAccommodationsComponent implements OnInit {

  Name: string;
  PlaceName: string;
  RegionName: string;
  Accommodations: Accomodation[];
  CountryName: string;
  AverageGrade: number;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;
  counter: Array<number>;
  PageSet: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private filteredAccService: FilteredAccommodationsService,
    private pagingService: PagingService) {
    activatedRoute.params.subscribe(params => {this.Name = params["Name"];
                                               this.PlaceName = params["PlaceName"];
                                               this.RegionName = params["RegionName"];
                                               this.CountryName = params["CountryName"];
                                               this.AverageGrade = params["AverageGrade"];
                                               this.BedCount = params["BedCount"];
                                               this.MinPrice = params["MinPrice"];
                                               this.MaxPrice = params["MaxPrice"]});
    this.Accommodations = [];
   }

  ngOnInit() {
      this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
      this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice,
      1, PagingService.PageSize).subscribe(x => {
        this.Accommodations = (x.json()).value;
              this.pagingService.initPagingService(x);

              let counterLength = 2;
              if (this.PageSet * 2 > PagingService.PageNumber) {
                  counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
              } 
              this.counter = new Array(counterLength);      
    })
  }

  changePage(pageNumber: number){
        this.filteredAccService.getAccommodations(this.Name, this.PlaceName, this.RegionName, 
        this.CountryName, this.AverageGrade, this.BedCount, this.MinPrice, this.MaxPrice, 
        pageNumber, PagingService.PageSize).subscribe(x => {
            this.Accommodations = (x.json()).value; 
          });   
  }

  showNext():boolean {
        return (this.PageSet * 2) < PagingService.PageNumber;
    }

  showPrevious():boolean {
        return this.PageSet > 1;
  }

  nextPageSet() {
      this.PageSet = this.PageSet + 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

  previousPageSet() {
    this.PageSet = this.PageSet - 1;
      let counterLength = 2;
      if (this.PageSet * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.PageSet-1)*2);
      } 
      this.counter = new Array(counterLength);
  }

}
