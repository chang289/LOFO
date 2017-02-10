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
var core_1 = require('@angular/core');
var core_2 = require('angular2-cookie/core');
var PipiComponent = (function () {
    function PipiComponent(cookieService) {
        this.cookieService = cookieService;
    }
    PipiComponent.prototype.ngOnInit = function () {
        console.log(this.cookieService.get("username"));
    };
    PipiComponent = __decorate([
        core_1.Component({
            selector: 'pi-pi',
            template: '<h1>Pipi</h1>',
        }), 
        __metadata('design:paramtypes', [core_2.CookieService])
    ], PipiComponent);
    return PipiComponent;
}());
exports.PipiComponent = PipiComponent;
//# sourceMappingURL=pipi.component.js.map