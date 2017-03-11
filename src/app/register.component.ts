import { Component, OnInit } from '@angular/core'

import { Users } from './users';
import { UserService } from './user.service';

import { LoginComponent } from './login.component';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
    providers:[UserService]
})

export class RegisterComponent {
    user: Users;
    pUsername: string;  //entered username
    pPassword: string  //entered password
    pPassword02: string; //re-entered password
    pEmail: string;     //entered email
    pVcode: string;     //Verification Code

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

        this.user = new Users();

        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.user.email = this.pEmail;
        this.user.token = this.pVcode;
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
    }

    clickSendVcode(): void {

        console.log("Enter clickSendVcode() function successed");

        if (this.pPassword != this.pPassword02) {
            alert("Re-entered password should be the same with password");
            return;
        }

        if (!this.pEmail.endsWith("@purdue.edu")) {
            alert("Please enter a valid Purdue Email");
            return;
        }

        console.log("re-password check finished");

        this.user = new Users();

        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.user.email = this.pEmail;
        var promise = this.userService.sendvcode(this.user)
                .then((user: Users) => {
                this.user = user;
                if (this.user == null) {
                    alert("Send vcode Failed");
                }
        })
        console.log("clickSendVcode() function finished");     
    }

    clickBack(): void {
        this.router.navigateByUrl('/login');
    }
}