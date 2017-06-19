import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { ChngPassUser } from '../user/chngPassUser.model';

@Injectable()
export class AuthenticationService {

    // public token: string;

    constructor(private http: Http) { }

    logIn(username: string, password: string, grant_type: string): Observable<any> {

        let header = new Headers();
        header.append('Content-type', 'application/x-www-form-urlencoded');

        let opts = new RequestOptions();
        opts.headers = header;
        //debugger;

        return this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`, opts)
            .map((response: Response) => {

                let token = response.json().access_token;
                if (token) {

                    //this.token = token;
                    var role = response.headers.get('role');
                    var id = response.headers.get('id');
                    var fullname = response.headers.get('fullname');
                    var email = response.headers.get('email');

                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("fullname", fullname);
                    localStorage.setItem("email", email);
                    localStorage.setItem("id", id);
                    localStorage.setItem("token_id", token);

                    return true;
                } else {

                    return false;
                }
            })
            .catch((error) => {
                return Observable.of(false);
            });


    }

    isLoggedIn(): boolean {

        if (localStorage.getItem("username") == null) {
            return false;
        }
        return true;
    }

    logOut() {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token_id');
        localStorage.removeItem('id');
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');

        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_id'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post('http://localhost:54042/' + 'api/Account/Logout', null, opts);
    }

    getCurrentUserRole(): string {
        var role: string;
        role = localStorage.getItem("role");

        if (role == null) {
            //alert("There is no role associated with user.");
            // ruter nesto..
            role = ""; // znak da je neko obican posetioc 
        } else {
            return role;
        }
    }
   getCurrentUserId():number{
        var id:number;
        var s=localStorage.getItem("id");
        if(s==null){
            s='';
        } else{
            id=parseInt(s);
            return id;
        }
    }

    changePassword(chngUser:ChngPassUser): Observable<any> {

        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_id'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post('http://localhost:54042/' + 'api/Account/ChangePassword', chngUser, opts).map((response: Response) => {

            if (response.ok) {
                return true;
            } else {

                return false;
            }

        })
            .catch((error) => {
                return Observable.of(false);
            });
    }
}