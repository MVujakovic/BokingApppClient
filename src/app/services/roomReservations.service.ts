import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RoomReservations } from '../roomReservations/roomReservations.model';
@Injectable()
export class RoomReservatonsService{
    s:string;
    s2:string;
    s3:string;
    s4:string;

    constructor (private http: Http){

    }

    getRoomReservations(): Observable<any> {

        return this.http.get("http://localhost:54042/api/RoomReservations").map(this.extractData);        
    }

    getRoomResById(id:number): Observable<any>{
        this.s2='http://localhost:54042/api/RoomReservation/'+id;
        return this.http.get(this.s2).map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getAccomodations(id:number):Observable<any>{
        this.s="http://localhost:54042/api/RoomResByUserId/"+id;
        return this.http.get(this.s).map(this.extractData);
    }

    getAccRes(id:number):Observable<any>{
        this.s4="http://localhost:54042/api/AccRoomRes/"+id;
        return this.http.get(this.s4).map(this.extractData);
        
    }

    postRoomReservation(newRoomRes:RoomReservations): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newRoomRes.Id=1;

        return this.http.post(
        'http://localhost:54042/api/RoomReservationPost',
        newRoomRes, opts);
    }

    putRes(id:number,newRes:RoomReservations):Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        this.s3='http://localhost:54042/api/RoomReservationMod/'+id;
        return this.http.put(this.s3,newRes,opts);
    }
}