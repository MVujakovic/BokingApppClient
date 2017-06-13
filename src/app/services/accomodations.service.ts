import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accomodation } from '../accomodation/accomodation.model';

@Injectable()
export class AccomodationsService{
    
    constructor (private http: Http){

    }

    getAccomodations(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Accomodations").map(this.extractData);        
    }

    getAccomodationsWithRooms(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Accomodations2").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postAccomodation(newAccomodation:Accomodation): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newAccomodation.Id=1;
       // newAccomodation.PlaceId=newAccomodation.Place.Id;
       // newAccomodation.AccomodationTypeId=newAccomodation.AccomodationType.Id;
        //newAccomodation.Place=null;
        //newAccomodation.AccomodationType=null;

        return this.http.post(
        'http://localhost:54042/api/AccomodationsPost',
        newAccomodation, opts);
    }
}