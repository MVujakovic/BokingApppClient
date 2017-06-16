import {Injectable} from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Comment } from '../comment/comment.model';

@Injectable()
export class CommentsService{
    s:string;
    s2:string;
    s3:string;
    constructor (private http: Http){

    }

    getComments(): Observable<any> {

        return this.http.get("http://localhost:54042/api/Comments").map(this.extractData);        
    }

    getCommentsByUserId(id:number):Observable<any>{
        this.s2='http://localhost:54042/api/CommentsByUserId/'+id;
        return this.http.get(this.s2).map(this.extractData); 
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

    putComment(id:number,newComment:Comment):Observable<any>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        this.s='http://localhost:54042/api/CommentsMod/'+id;
        return this.http.put(this.s,newComment,opts);
    }

    delete(id : number) : Observable<any> {
        this.s3='http://localhost:54042/api/CommentDelete/'+id;
        return this.http.delete(this.s3);
    }
}