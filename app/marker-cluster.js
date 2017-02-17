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
var core_2 = require('angular2-google-maps/core');
var rxjs_1 = require('rxjs');
var MarkerCluster = (function () {
    function MarkerCluster(gmapsApi) {
        this.gmapsApi = gmapsApi;
    }
    MarkerCluster.prototype.ngOnInit = function () {
        var _this = this;
        console.log("inside cluster");
        this.gmapsApi.getNativeMap().then(function (map) {
            var markerIcon = {
                //url: "assets/marker.png", // url
                scaledSize: new google.maps.Size(35, 35)
            };
            var style = {
                url: "assets/cluster.png",
                height: 40,
                width: 40,
                textColor: '#FFF',
                textSize: 11,
                backgroundPosition: "center center"
            };
            var options = {
                imagePath: "/assets/cluster",
                gridSize: 70,
                styles: [style, style, style]
            };
            var markers = [];
            rxjs_1.Observable
                .interval(500)
                .skipWhile(function (s) { return _this.points == null || _this.points.length <= 0; })
                .take(1)
                .subscribe(function () {
                for (var _i = 0, _a = _this.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(point.lat, point.lng),
                        icon: markerIcon
                    });
                    markers.push(marker);
                }
                var markerCluster = new MarkerClusterer(map, markers, options);
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MarkerCluster.prototype, "points", void 0);
    MarkerCluster = __decorate([
        core_1.Directive({
            selector: 'marker-cluster'
        }), 
        __metadata('design:paramtypes', [core_2.GoogleMapsAPIWrapper])
    ], MarkerCluster);
    return MarkerCluster;
}());
exports.MarkerCluster = MarkerCluster;
//# sourceMappingURL=marker-cluster.js.map