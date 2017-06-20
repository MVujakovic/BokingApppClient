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
    s5:string;
    s6:string;
    s7:string;
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

    getRoomReservations(id:number,id2:number) :Observable<any>{
        this.s7='http://localhost:54042/api/AccomodationReservationsByUser/'+id+'/'+id2;
        return this.http.get(this.s7).map(this.extractData);
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

    //     postAccomodation(accommodation: Accomodation, file: File): Observable<any> {
    //     // ako stavis json, pogodi metodu u kontroleru ali pada na multipart delu
    //     // headers.append('Content-type', 'application/json');

    //     // ako stavis multipart i ne stavis u web cofig sa serverske strane ono add multipart
    //     // pada, ne gadja kontroler uopste, i vraca unsuported type 415
    //     // ako odkomentarises to u web config, sa multipart prolazi i gadja kontroler, ali accomodation bude null
       
    //     // ovo je kao 'isto' 
    //     // headers.append('enctype', 'multipart/form-data');
    //     // headers.append('Content-type', 'multipart/form-data');

    //     // pokusaji...       
    //     // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     //headers.delete("Content-Type");

    //     let headers = new Headers();
        
    //     headers.append('enctype', 'multipart/form-data');
    //     //headers.append('Content-type', 'multipart/form-data');
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_id'));
    //     headers.append('Accept', 'application/json');

    //     let options = new RequestOptions({ headers: headers });
       
    //     let formData: any = new FormData();
    //    //let formData: FormData = new FormData();

    //     formData.append('accommodation', JSON.stringify(accommodation));
    //     formData.append('uploadFile', file, file.name);
       
    //     console.log('-----formData-----');
    //     console.log('-----formData.get(accomodation)');
    //     console.log(formData.get('accommodation'));

    //     console.log('-----formData.get(uploadFile)');
    //     console.log(formData.get('uploadFile'));


    //     console.log('-----headers-----');
    //     console.log(JSON.stringify(headers));

    //     console.log('-----options-----');
    //     console.log(JSON.stringify(options));

    //     return this.http.post(
    //         'http://localhost:54042/api/AccomodationsPost',
    //         JSON.stringify(formData), options);
    // }


    putAccomodation(id:number,newAccomodation:Accomodation):Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        this.s3='http://localhost:54042/api/AccomodationsMod/'+id;
        return this.http.put(this.s3,newAccomodation,opts);
    }

    delete(id : number) : Observable<any> {
        this.s6='http://localhost:54042/api/AccomodationDelete/'+id;
        return this.http.delete(this.s6);
    }
}