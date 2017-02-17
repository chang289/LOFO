"use strict";
var pipi_component_1 = require("./pipi.component");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/router/testing");
describe('PipiComponent', function () {
    var de;
    var map;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [pipi_component_1.PipiComponent],
            imports: [testing_2.RouterTestingModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(pipi_component_1.PipiComponent);
        map = fixture.componentInstance;
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
    });
    it('should be very pi guai', function () { return expect(map).toBeTruthy(); });
});
//# sourceMappingURL=pipi.component.spec.js.map