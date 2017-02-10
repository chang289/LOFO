import {Injectable} from '@angular/core';
import {Headers, Http,RequestOptions} from '@angular/http';



import {Post} from './post'
import 'rxjs/add/operator/toPromise';


@Injectable()


export class HistoryService {

	private getOngoingPostUrl = 'http://localhost:3000/post/get/ongoing';
	private updatePostUrl = 'http://localhost:3000/post/edit/589cdb4d92ac621c085563fb';
	private createPostUrl = 'http://localhost:3000/post/create';
	private deletePostByIdUrl = 'http://localhost:3000/post/delete/589bdc68f9e45f250c75c588';

	constructor(private http: Http) {}



	getPosts(): Promise<Post[]> {
		return this.http.get(this.getOngoingPostUrl)
				.toPromise()
				.then(response=>response.json().data as Post[])
				.catch(this.handleError);
	}

	updatePosts(post: Post):Promise<Post> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log("hhhh");
    	return this.http.post(this.updatePostUrl,post,options)
    	.toPromise()
    	.then(response => response.json().data as Post)
    	.catch(this.handleError);
	}

	deletePostByID(post:Post):Promise<Post> {
		return this.http.delete(this.deletePostByIdUrl)
		.toPromise()
		.then(response=>response.json().data as Post)
		.catch(this.handleError);
	}


	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //demo
		return Promise.reject(error.message || error);
	}

}