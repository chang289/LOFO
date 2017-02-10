import { Component, OnInit } from '@angular/core';

import { Users } from './users';
import { UserService } from './user.service';

import { RegisterComponent} from './register.component'

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  providers:[UserService]
})

export class LoginComponent implements OnInit{
    user: Users
    pUsername: string;  //entered username
    pPassword: string;  //entered password
    //match: boolean;

    constructor(private userService: UserService) { }
    
    clickLogin(): void {
        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.userService.loginUser(this.user)
    }

    ngOnInit(): void {
        this.clickLogin();
    }

    //Check is enter account information match database
    //userMatch(): boolean {
    //    this.match = (this.user.username === this.pUsername &&
    //                this.user.password === this.pPassword)
    //    return this.match;
    //}

}