import { Injectable } from '@angular/core';

import { protoUser } from '../model/protoUser';
import { USERS } from './mock-users';


@Injectable()
export class UserService {
    getUser(): Promise<protoUser> {
        return Promise.resolve(USERS[0]);
    }
}