import { User } from './User';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
	user: User;

	constructor() {}

	setUser(newUser: User): void {
		this.user = newUser;
	} 

	getUser(): User {
		return this.user;
	}
}