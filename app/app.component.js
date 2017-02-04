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
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
        this.markers = [
            {
                name: 'LWSN',
                lat: 40.427704,
                lng: -86.916937,
                draggable: false,
            },
            {
                name: 'PMU',
                lat: 40.424660,
                lng: -86.911482,
                draggable: false,
            },
            {
                name: 'PHYS',
                lat: 40.430124,
                lng: -86.913057,
                draggable: false,
            },
            {
                name: 'ARMS',
                lat: 40.431184,
                lng: -86.915602,
                draggable: false,
            },
            {
                name: 'KRAN',
                lat: 40.423975,
                lng: -86.910803,
                draggable: false,
            },
        ];
        //-------------for datepicler-----------------
        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            height: '34px',
            width: '200px',
        };
        //-------------for datepicler-----------------
        this._opened = false;
        this._closeOnClickOutside = true;
    }
    AppComponent.prototype.onDateRangeChanged = function (event) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    };
    AppComponent.prototype._toggleSidebar = function () {
        this._opened = !this._opened;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '/app/app.component.html',
            styleUrls: ['/app/app.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map