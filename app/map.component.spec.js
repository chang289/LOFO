"use strict";
var map_component_1 = require('./map.component');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var testing_2 = require('@angular/router/testing');
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
    it('should be truthy', function () { return expect(map).toBeTruthy(); });
});
//# sourceMappingURL=map.component.spec.js.map