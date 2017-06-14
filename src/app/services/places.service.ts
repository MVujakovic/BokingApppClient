import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Country} from '../country/country.model';
import { Region } from '../region/region.model';
import { Place } from '../place/place.model';

@Injectable()
export class PlacesService{
    s:string;
    constructor (private http: Http){

    }

    getPlaces(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Places").map(this.extractData);        
    }

    getPlacesWithAcc():Observable<any> {

        return this.http.get("http://localhost:54042/api/Places2").map(this.extractData);        
    }

    getPlaceById(id:number): Observable<any> {
        this.s='http://localhost:54042/api/Place/'+id;
        return this.http.get(this.s).map(this.extractData); 
        //return this.http.get("http://localhost:54042/api/Places/${id}").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postPlace(newPlace:Place): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newPlace.Id=1;

        return this.http.post(
        'http://localhost:54042/api/PlacesPost',
        newPlace, opts);
    }
}