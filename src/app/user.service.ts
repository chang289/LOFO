import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Users } from './users';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
	private URL = window.location.origin;
	private signupURL = this.URL + '/user/signup';
	private loginURL = this.URL + '/user/login';
	constructor(private http: Http) { }

    signupUser(user: Users): Promise<Users> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
		return this.http.post(this.signupURL, user, options)
			.toPromise()
			.then(response => response.json().data as Users)
			.catch(this.handleError);
	}

    loginUser(user: Users): Promise<Users> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
        console.log("Login process...");
		return this.http.post(this.loginURL, user, options)
			.toPromise()
			.then(response => response.json().data as Users)
			.catch(this.handleError);
	}

    private handleError(error: any): Promise<any> {
		console.error("User function error");
		console.error('An error occured (user)', error);
		return Promise.reject(error.message || error);
	}
}