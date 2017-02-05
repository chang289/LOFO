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
require('./markerclusterer.js');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
        this.backpackUrl = 'app/backpack_icon.png';
        this.walletUrl = 'app/wallet_icon.png';
        this.keyUrl = 'app/key_icon.png';
        this.cellphoneUrl = 'app/cellphone_icon.png';
        this.clothUrl = 'app/cloth_icon.png';
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
    AppComponent.prototype.clickedMarker = function (marker, index) {
        console.log("clicked marker: " + marker.name + " at index " + index + " length is " + this.markers.length);
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.width != '0%') {
            sidebar.style.width = '0%';
        }
        else {
            sidebar.style.width = '20%';
        }
    };
    AppComponent.prototype.mapClicked = function ($event) {
        console.log('Map clicked');
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false,
        };
        this.newMarker = newMarker;
    };
    AppComponent.prototype.markerDragEnd = function (marker, $event) {
        console.log('dragEnd', marker, $event);
    };
    AppComponent.prototype.newPostOnMap = function () {
        console.log('hello');
        var newMarker = this.markers[this.markers.length - 1];
        console.log(newMarker.lat);
        console.log(newMarker.lng);
    };
    AppComponent.prototype.cluster = function ($maker, $event) {
        console.log('zoomed');
    };
    AppComponent.prototype.cancelPost = function ($event) {
        console.log("cancel");
        this.newMarker = null;
    };
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