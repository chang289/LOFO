import { Component, OnInit } from '@angular/core'

import { Users } from './users';
import { UserService } from './user.service';



@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    providers:[UserService]
})

export class RegisterComponent {
    user: Users
    pUsername: string;  //entered username
    pPassword: string  //entered password
    pPassword02: string; //re-entered password
    pEmail: string;     //entered email

    constructor(private userService: UserService) { }
    
    clickSumbit(): void {
        this.user = new Users();

        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.user.email = this.pEmail;
        var promise = this.userService.signupUser(this.user);
        promise.then(user => {
            this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
    }
}