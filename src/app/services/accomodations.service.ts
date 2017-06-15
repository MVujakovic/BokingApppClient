import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accomodation } from '../accomodation/accomodation.model';

@Injectable()
export class AccomodationsService{
    s:string;
    s2:string;
    s3:string;
    s4:string;
    constructor (private http: Http){

    }

    getAccomodations(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Accomodations").map(this.extractData);        
    }

    getAccomodationsWithRooms(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Accomodations2").map(this.extractData);        
    }

    getAccomodationsByOwnerId(id:number):Observable<any>{
        this.s2='http://localhost:54042/api/AccomodationsByOwnerId/'+id;
        return this.http.get(this.s2).map(this.extractData);   
    }

    getAccomodationsByGrade(id:number):Observable<any>{
        this.s4='http://localhost:54042/api/AccomodationsByGrade/'+id;
        return this.http.get(this.s4).map(this.extractData); 
    }

    getAccomodationById(id:number): Observable<any> {
        this.s='http://localhost:54042/api/Accomodation/'+id;
        return this.http.get(this.s).map(this.extractData); 
       // return this.http.get("http://localhost:54042/api/Accomodations/${id}").map(this.extractData);        
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

        return this.http.post(
        'http://localhost:54042/api/AccomodationsPost',
        newAccomodation, opts);
    }

    putAccomodation(id:number,newAccomodation:Accomodation):Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        this.s3='http://localhost:54042/api/AccomodationsMod/'+id;
        return this.http.put(this.s3,newAccomodation,opts);
    }
}