import {Injectable} from '@angular/core';
import {Headers, Http,RequestOptions} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';




import {Posts} from './posts'
import 'rxjs/add/operator/toPromise';


@Injectable()


export class HistoryService {

	constructor(private http: Http, private cookieService: CookieService) {}
	private URL = window.location.origin;
	private lofoEmail = this.cookieService.get("lofoemail");
	private getUserPostsUrl = this.URL + '/post/get/email/';
	private updatePostUrl = this.URL + '/post/edit/';
	private deletePostByIdUrl = this.URL + '/post/delete/';





	getPosts(): Promise<Posts[]> {
		console.log(this.getUserPostsUrl);
		return this.http.get(this.getUserPostsUrl + this.lofoEmail)
				.toPromise()
				.then(response=>response.json().data as Posts[])
				.catch(this.handleError);
	}

	updatePosts(post: Posts):Promise<Posts> {
		console.log(post._id);
	    let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log("hhhh");
    	return this.http.post(this.updatePostUrl + post._id,post,options)
    	.toPromise()
    	.then(response => response.json().data as Posts)
    	.catch(this.handleError);
	}

	deletePostByID(post:Posts):Promise<string> {
		return this.http.delete(this.deletePostByIdUrl + post._id)
		.toPromise()
		.then(response=>response.json().data as string)
		.catch(this.handleError);
	}


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //demo
		return Promise.reject(error.message || error);
	}

}