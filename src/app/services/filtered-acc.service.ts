import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Accomodation } from '../accomodation/accomodation.model';

@Injectable()
export class FilteredAccommodationsService {

    constructor(private http: Http)
    {
       
    }

    getAccommodations(name: string, placeName: string, regionName: string, countryName: string,
                        averageGrade: number, bedCount: number, minPrice: number, maxPrice: number,
                        pageNumber: number, pageSize: number): Observable<any> {
        let host = 'localhost:54042';
        let skip = (pageNumber - 1) * pageSize;
        let filterPredicates = "";

        if (name!=undefined && name!="undefined"){
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Name eq '" + name + "'";
        }

        if (placeName!=undefined && placeName!="undefined"){
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Place/Name eq '" + placeName + "'";
        }

        if (regionName!=undefined && regionName!="undefined"){
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Place/Region/Name eq '" + regionName + "'";
        }

        if (countryName!=undefined && countryName!="undefined"){
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Place/Region/Country/Name eq '" + countryName + "'";
        }

        if (averageGrade!=undefined && averageGrade!=-1) {
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "AverageGrade ge " + averageGrade;
        }

        if (bedCount!=undefined && bedCount!=-1) {
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Rooms/any(c: c/BedCount eq "+ bedCount +")";
        }

        if (minPrice!=undefined && minPrice!=-1) {
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Rooms/any(c: c/PricePerNight ge "+ minPrice +")";
        }

        if (maxPrice!=undefined && maxPrice!=-1) {
            if (filterPredicates!=""){
                filterPredicates = filterPredicates + " and ";
            }
            filterPredicates = filterPredicates + "Rooms/any(c: c/PricePerNight le "+ maxPrice +")";
        }
        filterPredicates = filterPredicates + " and Approved eq true"; 

        // let urlAddress = `http://${host}/odata/AccomOData?$filter=${filterPredicates} 
        // &$expand=Place, Owner, AccomodationType &$inlinecount=allpages`;

        let urlAddress = `http://${host}/odata/AccomOData?$top=${pageSize}&$skip=${skip} &$filter=${filterPredicates} 
        &$expand=Place, Owner, AccomodationType &$inlinecount=allpages`;
        return this.http.get(urlAddress);
        //return this.http.get(urlAddress).map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }
}