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
var RegisterComponent = (function () {
    function RegisterComponent(userService) {
        this.userService = userService;
    }
    RegisterComponent.prototype.clickSumbit = function () {
        var _this = this;
=======
var core_1 = require('@angular/core');
var users_1 = require('./users');
var user_service_1 = require('./user.service');
var core_2 = require('angular2-cookie/core');
var router_1 = require('@angular/router');
var RegisterComponent = (function () {
    function RegisterComponent(userService, cookieService, router) {
        this.userService = userService;
        this.cookieService = cookieService;
        this.router = router;
    }
    RegisterComponent.prototype.clickSubmit = function () {
        var _this = this;
        if (this.pPassword != this.pPassword02) {
            alert("Re-entered password should be the same with password");
            return;
        }
        if (!this.pEmail.endsWith("@purdue.edu")) {
            alert("Please enter a valid Purdue Email");
            return;
        }
>>>>>>> master
        this.user = new users_1.Users();
        this.user.username = this.pUsername;
        this.user.password = this.pPassword;
        this.user.email = this.pEmail;
<<<<<<< HEAD
        var promise = this.userService.signupUser(this.user);
        promise.then(function (user) {
            _this.user = user;
            console.log(user);
        }).catch();
        console.log(this.user);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'register',
        templateUrl: 'register.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RegisterComponent);
=======
        var promise = this.userService.signupUser(this.user)
            .then(function (user) {
            _this.user = user;
            if (_this.user == null) {
                alert("SignUp Failed");
            }
            else {
                alert("SignUp Success");
                _this.cookieService.put("lofoemail", _this.user.email);
                _this.router.navigateByUrl('/map');
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html',
            styleUrls: ['register.component.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, core_2.CookieService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
>>>>>>> master
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map