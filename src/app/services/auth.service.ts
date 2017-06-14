import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    // poenta je da u logIn metodi pribavimo autorizacioni tok. i setujemo ga u localStorage. 

    logIn(username: string, password: string, grant_type:string): Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');

        let opts = new RequestOptions();
        opts.headers = header;

        // event.preventDefault();
        // let body = JSON.stringify({ username, password}); // valjda moze ovako, samo treba jos grant type
    

            return this.http.post(`http://localhost:54042/oauth/token`,
            `username=${username}&password=${password}&grant_type=${grant_type}`, opts);
    }

    isLoggedIn(): boolean {

         if (localStorage.getItem("userToken") == null) {
            return false;
        }
        return true;
    }

    logOut() {
        // remove user from local storage to log user out
        //localStorage.removeItem('userToken');

        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post('http://localhost:54042/' + 'api/Account/Logout', null, opts);

    }

}