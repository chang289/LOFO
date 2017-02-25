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
var core_2 = require('angular2-cookie/core');
require('./markerclusterer.js');
var posts_1 = require('./posts');
var router_1 = require('@angular/router');
<<<<<<< HEAD
var MapComponent = (function () {
    function MapComponent(postService, cookieService, router) {
        this.postService = postService;
        this.cookieService = cookieService;
        this.router = router;
        // title: string = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
=======
var http_1 = require('@angular/http');
var MapComponent = (function () {
    function MapComponent(postService, cookieService, router, http) {
        this.postService = postService;
        this.cookieService = cookieService;
        this.router = router;
        this.http = http;
        // title: string = 'LOFO';
        this.lat = 40.424660;
        this.lng = -86.911482;
        this.zoom = 5;
>>>>>>> Ketao
        this.str = 'abc';
        this.lost = 'true';
        this.tags = [
            'Phone',
            'Key',
            'Wallet',
            'Bag',
            'Cloth'
        ];
        this.markers = [];
<<<<<<< HEAD
=======
        this.points = [];
>>>>>>> Ketao
        this.backpackUrl = 'app/backpack_icon.png';
        this.walletUrl = 'app/wallet_icon.png';
        this.keyUrl = 'app/key_icon.png';
        this.cellphoneUrl = 'app/cellphone_icon.png';
        this.clothUrl = 'app/cloth_icon.png';
        // markers: marker[] = [
        //     {
        //         name: 'Wallet_0',
        //         lat: 40.427704,
        //         lng: -86.916937,
        //         draggable: false,
        //         iconUrl: 'app/icon_wallet.png'
        //     },
        // ];
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
    MapComponent.prototype.getPost = function () {
        var _this = this;
        console.log("pdd");
        return this.postService.getOngoingPosts().then(function (posts) { return _this.posts = posts; });
    };
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
<<<<<<< HEAD
=======
        this.http.get("assets/points.json").subscribe(function (data) {
            _this.points = data.json();
        });
>>>>>>> Ketao
        this.lofoemail = this.cookieService.get("lofoemail");
        var promise = this.getPost();
        console.log(promise);
        promise.then(function (posts) {
            // Here you can use the data because it's ready
            // this.myVariable = data;
            _this.posts = posts;
            console.log(posts);
            var newPostIcon;
            for (var i in posts) {
                console.log(i);
                var singlePost = posts[i];
                var tag = posts[i].tag;
                if (tag == 0) {
                    newPostIcon = 'app/icon_phone.png';
                }
                else if (tag == 1) {
                    newPostIcon = 'app/icon_key.png';
                }
                else if (tag == 2) {
                    newPostIcon = 'app/icon_wallet.png';
                }
                else if (tag == 3) {
                    newPostIcon = 'app/icon_backpack.png';
                }
                else if (tag == 4) {
                    newPostIcon = 'app/icon_cloth.png';
                }
                var newMarker = {
                    name: singlePost.fullname,
                    lat: singlePost.locationX,
                    lng: singlePost.locationY,
                    iconUrl: newPostIcon,
                    draggable: false,
                };
                _this.markers.push(newMarker);
            }
        }).catch(function (ex) {
            console.log(ex);
        });
        console.log(this.posts);
    };
    MapComponent.prototype.onClick = function () {
        this.post = new posts_1.Posts();
        this.post.poster = this.cookieService.get("lofoemail");
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tag;
        this.post.photo = this.photoUrl;
        this.post.contact = this.phone;
        this.post.locationX = this.newMarker.lat;
        this.post.locationY = this.newMarker.lng;
        this.post.createTime = new Date();
        this.post.modifiedTime = new Date();
        if (this.lost == 'true')
            this.post.lost = true;
        else if (this.lost == 'false')
            this.post.lost = false;
        console.log(this.postService.createPost(this.post));
        var newPostIcon;
        if (this.post.tag == 0) {
            newPostIcon = 'app/icon_phone.png';
        }
        else if (this.post.tag == 1) {
            newPostIcon = 'app/icon_key.png';
        }
        else if (this.post.tag == 2) {
            newPostIcon = 'app/icon_wallet.png';
        }
        else if (this.post.tag == 3) {
            newPostIcon = 'app/icon_backpack.png';
        }
        else if (this.post.tag == 4) {
            newPostIcon = 'app/icon_cloth.png';
        }
        var newMarker = {
            name: 'New Post',
            lat: this.newMarker.lat,
            lng: this.newMarker.lng,
            iconUrl: newPostIcon,
            draggable: false,
        };
        this.markers.push(newMarker);
        this.newMarker = null;
        this.fullname = null;
        this.title = null;
        this.description = null;
        this.phone = null;
        this.tag = -1;
        //console.log(this.postService.createPost(post));
    };
<<<<<<< HEAD
    MapComponent.prototype.clickedMarker = function (marker, index) {
        console.log("clicked marker: " + marker.name + " at index " + index + " length is " + this.markers.length);
=======
    MapComponent.prototype.clickedMarker = function (marker) {
        console.log("clicked marker: " + marker.name + " length is " + this.markers.length);
>>>>>>> Ketao
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.display != 'none') {
            sidebar.style.display = 'none';
        }
        else {
            sidebar.style.display = 'block';
        }
    };
    MapComponent.prototype.mapClicked = function ($event) {
<<<<<<< HEAD
        console.log(this.posts);
=======
>>>>>>> Ketao
        console.log('Map clicked');
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        console.log(this.markers);
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            item: 'none',
            draggable: false,
        };
        this.newMarker = newMarker;
    };
    MapComponent.prototype.markerDragEnd = function (marker, $event) {
        console.log('dragEnd', marker, $event);
    };
    MapComponent.prototype.newPostOnMap = function () {
        console.log('hello');
        var newMarker = this.markers[this.markers.length - 1];
        console.log(newMarker.lat);
        console.log(newMarker.lng);
    };
    MapComponent.prototype.cluster = function ($maker, $event) {
        console.log('zoomed');
    };
    MapComponent.prototype.cancelPost = function ($event) {
        console.log("cancel");
        this.newMarker = null;
    };
    MapComponent.prototype.onDateRangeChanged = function (event) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    };
    MapComponent.prototype._toggleSidebar = function () {
        this._opened = !this._opened;
    };
    MapComponent.prototype.signOut = function () {
        this.cookieService.remove("lofoemail");
        this.router.navigateByUrl("/login");
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'my-map',
            templateUrl: '/app/map.component.html',
            providers: [post_service_1.PostService]
        }), 
<<<<<<< HEAD
        __metadata('design:paramtypes', [post_service_1.PostService, core_2.CookieService, router_1.Router])
=======
        __metadata('design:paramtypes', [post_service_1.PostService, core_2.CookieService, router_1.Router, http_1.Http])
>>>>>>> Ketao
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map