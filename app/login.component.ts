import { Component, OnInit } from '@angular/core';

import { Users } from './users';
import { UserService } from './user.service';

import { RegisterComponent} from './register.component'
<<<<<<< HEAD
=======
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

>>>>>>> master

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
<<<<<<< HEAD
    providers:[UserService]
})

export class LoginComponent {
    user: Users
    pEmail: string;  //entered email
=======
    styleUrls: ['login.component.css'],
    providers:[UserService]
})

export class LoginComponent implements OnInit {
    user: Users
    pEmail: string;  //entered username
>>>>>>> master
    pPassword: string;  //entered password
    //match: boolean;


<<<<<<< HEAD
    constructor(private userService: UserService) { }
    
=======
    constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }
    
    ngOnInit() {
        if (this.cookieService.get("lofoemail") != null) {
            this.router.navigateByUrl("/map");
        }
    }

>>>>>>> master
    clickLogin(): void {
        this.user = new Users();
        
        this.user.email = this.pEmail;
        this.user.password = this.pPassword;
<<<<<<< HEAD
        var promise = this.userService.loginUser(this.user);
        promise.then(user => {
            this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
=======
        var promise = this.userService.loginUser(this.user)
            .then((user: Users) => {
                this.user = user;
                if (this.user == null) {
                    alert("Login Failed");
                }
                else {
                    this.cookieService.put("lofoemail", this.user.email);
                    this.router.navigateByUrl('/map');
                }
        });
    }

    clickSignUp(): void {
        this.router.navigateByUrl('/register');
>>>>>>> master
    }
}