import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../user/user.model';

@Injectable()
export class RegisterService{

    constructor(private http:Http){

    }

    // kontam da nam get users ne ide ovde, msm tek kad se uloguje i ako je admin
    // moze da vidi sve usere..

    postUser(newUser:User) :Observable<any> {
        const headers: Headers=new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

       const opts: RequestOptions = new RequestOptions();
       opts.headers = headers;

         return this.http.post(
        'http://localhost:54042/api/Account/Register',
        newUser, opts);
    }


}