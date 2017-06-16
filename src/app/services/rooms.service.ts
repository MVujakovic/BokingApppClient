import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Room } from '../room/room.model';

@Injectable()
export class RoomsService{
    s:string;
    s2:string;
    constructor (private http: Http){

    }

    getRooms(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Rooms").map(this.extractData);        
    }

    getRoomById(id:number): Observable<any> {
        this.s='http://localhost:54042/api/Rooms/'+id;
        return this.http.get(this.s).map(this.extractData); 
        //return this.http.get('http://localhost:54042/api/Room/id').map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postRoom(newRoom:Room): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newRoom.Id=1;

        return this.http.post(
        'http://localhost:54042/api/RoomsPost',
        newRoom, opts);
    }

    putRoom(id:number,newRoom:Room):Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        this.s2='http://localhost:54042/api/RoomsMod/'+id;
        return this.http.put(this.s2,newRoom,opts);
    }
}