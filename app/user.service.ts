import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Users } from './users';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
	private signupURL = 'http://localhost:3000/user/signup';
	private loginURL = 'http://localhost:3000/user/login';
	constructor(private http: Http) { }

    signupUser(user: Users): Promise<Users> {
		return this.http.post(this.signupURL, user)
			.toPromise()
			.then(response => response.json().data as Users)
			.catch(this.handleError);
	}

    loginUser(user: Users): Promise<Users> {
        console.log("Login process...");
		return this.http.post(this.loginURL, user)
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