import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Country} from '../country/country.model';
import { Region } from '../region/region.model';

@Injectable()
export class RegionsService{
    s:string;
    constructor (private http: Http){

    }

    getRegions(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Regions").map(this.extractData);        
    }

    getRegionById(id:number): Observable<any> {
        this.s='http://localhost:54042/api/Region/'+id;
        return this.http.get(this.s).map(this.extractData); 
        //return this.http.get("http://localhost:54042/api/Region/${id}").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postRegion(newRegion:Region): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newRegion.Id=1;

        return this.http.post(
        'http://localhost:54042/api/RegionPost',
        newRegion, opts);
    }
}