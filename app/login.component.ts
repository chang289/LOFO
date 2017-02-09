import { Component, OnInit } from '@angular/core';

import { protoUser } from '../model/protoUser';
import { UserService } from './user.service';

import { RegisterComponent} from './register.component'

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit{
    user: protoUser
    pUsername: String;  //entered username
    pPassword: String;  //entered password
    match: boolean;

    constructor(private userService: UserService) { }

    getUser(): void {
        this.userService.getUser().then(user => this.user = user);
    }

    ngOnInit(): void {
        this.getUser();
    }

    //Check is enter account information match database
    userMatch(): boolean {
        this.match = (this.user.username === this.pUsername &&
                    this.user.password === this.pPassword)
        return this.match;
    }

}