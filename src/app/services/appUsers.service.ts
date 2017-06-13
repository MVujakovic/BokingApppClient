import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppUser } from '../appUser/appUser.model';

@Injectable()
export class AppUsersService{
    
    constructor (private http: Http){

    }

    getAppUsersWithComments(): Observable<any> {

        return this.http.get("http://localhost:54042/api/AppUsers").map(this.extractData);        
    }

    getAppUsersWithAccomodations():Observable<any> {

        return this.http.get("http://localhost:54042/api/AppUsers2").map(this.extractData);        
    }

    getAppUsersWithRoomReservations():Observable<any> {

        return this.http.get("http://localhost:54042/api/AppUsers3").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postAppUser(newAppUser:AppUser): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newAppUser.Id=1;

        return this.http.post(
        'http://localhost:54042/api/AppUserPost',
        newAppUser, opts);
    }
}