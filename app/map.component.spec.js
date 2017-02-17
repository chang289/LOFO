"use strict";
var map_component_1 = require("./map.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
describe('MapComponetn', function () {
    var de;
    var map;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [map_component_1.MapComponent],
            imports: [testing_2.RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(map_component_1.MapComponent);
        map = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should init', function () { return expect(map).toBeDefined(); });
    it('should be truthy', function () { return expect(map).toBeTruthy(); });
    it('should always have only one newMarker', function () { return expect(map.markers.length).toBe(map.posts.length); });
    it('should always disappear when close', function () { return expect(map.newMarker).toBe(null); });
    it('should have expected infowindow', function () {
        fixture.detectChanges();
        var h1 = de.nativeElement;
        expect(h1.innerText).toBe(map.post.fullname);
    });
    it('should close the side nav bar', function () {
        fixture.detectChanges();
        var h1 = de.nativeElement;
        map.clickedMarker;
        expect(map.clickedMarker).toBeDefined();
    });
});
//# sourceMappingURL=map.component.spec.js.map