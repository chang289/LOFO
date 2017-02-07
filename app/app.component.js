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
var post_service_1 = require('./post.service');
require('./markerclusterer.js');
var posts_1 = require('./posts');
var AppComponent = (function () {
    function AppComponent(postService) {
        this.postService = postService;
        // title: string = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
        this.str = 'abc';
        this.tags = 1;
        this.backpackUrl = 'app/backpack_icon.png';
        this.walletUrl = 'app/wallet_icon.png';
        this.keyUrl = 'app/key_icon.png';
        this.cellphoneUrl = 'app/cellphone_icon.png';
        this.clothUrl = 'app/cloth_icon.png';
        this.markers = [
            {
                name: 'Wallet_0',
                lat: 40.427704,
                lng: -86.916937,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'Wallet_1',
                lat: 40.424660,
                lng: -86.911482,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'Wallet_2',
                lat: 40.430124,
                lng: -86.913057,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'Wallet_3',
                lat: 40.431184,
                lng: -86.915602,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'Wallet_4',
                lat: 40.423975,
                lng: -86.910803,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'Wallet_5',
                lat: 40.427704,
                lng: -86.916937,
                draggable: false,
                iconUrl: 'app/icon_wallet.png'
            },
            {
                name: 'phone_1',
                lat: 40.42473535424809,
                lng: -86.92073822021484,
                draggable: false,
                iconUrl: 'app/icon_phone.png'
            },
            {
                name: 'phone_2',
                lat: 40.42734887689348,
                lng: -86.91297054290771,
                draggable: false,
                iconUrl: 'app/icon_phone.png'
            },
            {
                name: 'phone_3',
                lat: 40.42845959326608,
                lng: -86.90915107727051,
                draggable: false,
                iconUrl: 'app/icon_phone.png'
            },
            {
                name: 'phone_4',
                lat: 40.42509471963362,
                lng: -86.90803527832031,
                draggable: false,
                iconUrl: 'app/icon_phone.png'
            },
        ];
        this.mapItem = 'All';
        this.mapLostOrFound = 'All';
        this.mapExpired = 'All';
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
    AppComponent.prototype.onClick = function () {
        console.log(this.tag);
        this.post = new posts_1.Posts();
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tags;
        this.post.locationX = this.newMarker.lat;
        this.post.locationY = this.newMarker.lng;
        this.post.createTime = new Date();
        this.post.modifiedTime = new Date();
        this.postService.createPost(this.post);
        // console.log(this.postService.createPost(post));
    };
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
            item: 'none',
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
            providers: [post_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map