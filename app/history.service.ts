import {Injectable} from '@angular/core';
import {Headers, Http,RequestOptions} from '@angular/http';
import { CookieService } from 'angular2-cookie/core';




import {Post} from './post'
import 'rxjs/add/operator/toPromise';


@Injectable()


export class HistoryService {

	constructor(private http: Http, private cookieService: CookieService) {}

	private lofoEmail = this.cookieService.get("lofoemail");
	private getUserPostsUrl = 'http://localhost:3000/post/get/email/';
	private updatePostUrl = 'http://localhost:3000/post/edit/';
	private deletePostByIdUrl = 'http://localhost:3000/post/delete/';





	getPosts(): Promise<Post[]> {
		console.log(this.getUserPostsUrl);
		return this.http.get(this.getUserPostsUrl + this.lofoEmail)
				.toPromise()
				.then(response=>response.json().data as Post[])
				.catch(this.handleError);
	}

	updatePosts(post: Post):Promise<Post> {
		console.log(post._id);
	    let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log("hhhh");
    	return this.http.post(this.updatePostUrl + post._id,post,options)
    	.toPromise()
    	.then(response => response.json().data as Post)
    	.catch(this.handleError);
	}

	deletePostByID(post:Post):Promise<Post> {
		return this.http.delete(this.deletePostByIdUrl + post._id)
		.toPromise()
		.then(response=>response.json().data as Post)
		.catch(this.handleError);
	}


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //demo
		return Promise.reject(error.message || error);
	}

}