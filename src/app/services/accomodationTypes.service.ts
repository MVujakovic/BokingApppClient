import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AccommodationType } from '../accomodationType/accommodationType.model';

@Injectable()
export class AccomodationTypesService{
    
    constructor (private http: Http){

    }

    getAccomodationTypes(): Observable<any> {

        return this.http.get("http://localhost:54042/api/AccomodationTypes").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postAccomodationType(newAccomodationType:AccommodationType): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newAccomodationType.Id=1;

        return this.http.post(
        'http://localhost:54042/api/AccomodationTypePost',
        newAccomodationType, opts); //hardkodovati id da ne bude 0
    }
}