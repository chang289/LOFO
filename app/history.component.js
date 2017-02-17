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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("angular2-cookie/core");
var history_service_1 = require("./history.service");
var HistoryComponent = (function () {
    function HistoryComponent(historyService, router, cookieService) {
        this.historyService = historyService;
        this.router = router;
        this.cookieService = cookieService;
    }
    HistoryComponent.prototype.getPosts = function () {
        var _this = this;
        this.historyService.getPosts()
            .then(function (sample_posts) { return _this.sample_posts = sample_posts; });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        this.getPosts();
        if (this.cookieService.get("lofoemail") == null) {
            this.router.navigateByUrl("/login");
        }
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-history',
        templateUrl: './history.component.html',
        styleUrls: ['history.component.css'],
        providers: [history_service_1.HistoryService]
    }),
    __metadata("design:paramtypes", [history_service_1.HistoryService,
        router_1.Router,
        core_2.CookieService])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map