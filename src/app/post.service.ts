import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Posts } from './posts';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {
	private URL = window.location.origin;
	private createURL = this.URL + '/post/create';  // URL to web api
	private getOngoingURL = this.URL + '/post/get/ongoing';

	constructor(private http: Http) { }

	// demo(): Posts {
	// 	return this.http.post(this.URL)
	// 		.toPromise()
	// 		.then(response => response.json().data as Posts)
	// 		.catch(this.handleError);
	// }

	createPost(post: Posts): Promise<Posts> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		return this.http.post(this.createURL, post, options)
			.toPromise()
			.then(response => response.json().data as Posts)
			.catch(this.handleError);
	}

	getOngoingPosts(): Promise<Posts[]> {

		return this.http.get(this.getOngoingURL)
			.toPromise()
			.then(response => response.json().data as Posts[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error("error2113");
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}