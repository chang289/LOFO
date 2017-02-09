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
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var mydaterangepicker_1 = require('mydaterangepicker');
//for datepicker
var mydatepicker_1 = require('mydatepicker');
//for sidebar
var ng_sidebar_1 = require('ng-sidebar');
//for map
var core_2 = require('angular2-google-maps/core');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var pipi_component_1 = require('./pipi.component');
var map_component_1 = require('./map.component');
var APP_DECLARATION = [
    app_component_1.AppComponent
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                mydatepicker_1.MyDatePickerModule,
                mydaterangepicker_1.MyDateRangePickerModule,
                ng_sidebar_1.SidebarModule,
                http_1.HttpModule,
                ng2_bootstrap_1.ModalModule.forRoot(),
                ng2_bootstrap_1.ButtonsModule.forRoot(),
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/map',
                        pathMatch: 'full'
                    },
                    {
                        path: 'pipi',
                        component: pipi_component_1.PipiComponent
                    },
                    {
                        path: 'map',
                        component: map_component_1.MapComponent
                    }
                ]),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyC9uiQRUlJhkX7x0Vf0ZAvzOF-qcXO-O5Y'
                }),
                ng2_bootstrap_1.CollapseModule.forRoot()
            ],
            exports: [router_1.RouterModule],
            providers: [],
            declarations: [app_component_1.AppComponent, pipi_component_1.PipiComponent, map_component_1.MapComponent, APP_DECLARATION],
            bootstrap: [app_component_1.AppComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map