import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Comment } from '../comment/comment.model';

@Injectable()
export class CommentsService{
    
    constructor (private http: Http){

    }

    getComments(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Comments").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    postComment(newComment:Comment): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        newComment.Id=1;

        return this.http.post(
        'http://localhost:54042/api/CommentPost',
        newComment, opts);
    }
}