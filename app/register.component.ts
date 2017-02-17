import { Component, OnInit } from '@angular/core'

import { Users } from './users';
import { UserService } from './user.service';
<<<<<<< HEAD
=======
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
>>>>>>> master



@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
<<<<<<< HEAD
=======
    styleUrls: ['register.component.css'],
>>>>>>> master
    providers:[UserService]
})

export class RegisterComponent {
<<<<<<< HEAD
    user: Users
=======
    user: Users;
>>>>>>> master
    pUsername: string;  //entered username
    pPassword: string  //entered password
    pPassword02: string; //re-entered password
    pEmail: string;     //entered email

<<<<<<< HEAD
    constructor(private userService: UserService) { }
    
    clickSumbit(): void {
=======
    constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }
    
    clickSubmit(): void {

        if (this.pPassword != this.pPassword02) {
            alert("Re-entered password should be the same with password");
            return;
        }

        if (!this.pEmail.endsWith("@purdue.edu")) {
            alert("Please enter a valid Purdue Email");
            return;
        }

>>>>>>> master
        this.user = new Users();

        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.user.email = this.pEmail;
<<<<<<< HEAD
        var promise = this.userService.signupUser(this.user);
        promise.then(user => {
            this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
=======
        var promise = this.userService.signupUser(this.user)
            .then((user: Users) => {
                this.user = user;
                if (this.user == null) {
                    alert("SignUp Failed");
                }
                else {
                    alert("SignUp Success");
                    this.cookieService.put("lofoemail", this.user.email);
                    this.router.navigateByUrl('/map');
                }
            });
>>>>>>> master
    }
}