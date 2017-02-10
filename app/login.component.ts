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

export class LoginComponent {
    user: Users
    pEmail: string;  //entered email
    pPassword: string;  //entered password
    //match: boolean;


    constructor(private userService: UserService) { }
    
    clickLogin(): void {
        this.user = new Users();
        
        this.user.email = this.pEmail;
        this.user.password = this.pPassword;
        var promise = this.userService.loginUser(this.user);
        promise.then(user => {
            this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
    }
}