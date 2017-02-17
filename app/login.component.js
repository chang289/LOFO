"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
<<<<<<< HEAD
var core_1 = require("@angular/core");
var users_1 = require("./users");
var user_service_1 = require("./user.service");
var LoginComponent = (function () {
    //match: boolean;
    function LoginComponent(userService) {
        this.userService = userService;
    }
=======
var core_1 = require('@angular/core');
var users_1 = require('./users');
var user_service_1 = require('./user.service');
var core_2 = require('angular2-cookie/core');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    //match: boolean;
    function LoginComponent(userService, cookieService, router) {
        this.userService = userService;
        this.cookieService = cookieService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.cookieService.get("lofoemail") != null) {
            this.router.navigateByUrl("/map");
        }
    };
>>>>>>> master
    LoginComponent.prototype.clickLogin = function () {
        var _this = this;
        this.user = new users_1.Users();
        this.user.email = this.pEmail;
        this.user.password = this.pPassword;
<<<<<<< HEAD
        var promise = this.userService.loginUser(this.user);
        promise.then(function (user) {
            _this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LoginComponent);
=======
        var promise = this.userService.loginUser(this.user)
            .then(function (user) {
            _this.user = user;
            if (_this.user == null) {
                alert("Login Failed");
            }
            else {
                _this.cookieService.put("lofoemail", _this.user.email);
                _this.router.navigateByUrl('/map');
            }
        });
    };
    LoginComponent.prototype.clickSignUp = function () {
        this.router.navigateByUrl('/register');
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, core_2.CookieService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
>>>>>>> master
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map