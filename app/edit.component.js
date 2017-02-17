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
var post_1 = require("./post");
var history_service_1 = require("./history.service");
var EditComponent = (function () {
    function EditComponent(historyService, cookieService, router) {
        this.historyService = historyService;
        this.cookieService = cookieService;
        this.router = router;
        this.tag = 0;
        this.types = [
            'Phone',
            'Key',
            'Wallet',
            'Bag',
            'Cloth'
        ];
    }
    EditComponent.prototype.Edit = function () {
        console.log(this.edited_post);
        console.log(this.historyService.updatePosts(this.edited_post));
    };
    EditComponent.prototype.Delete = function () {
        console.log(this.historyService.deletePostByID(this.edited_post));
    };
    EditComponent.prototype.updateAlart = function () {
        if (alert('You\' ve successfully updated this post!')) { }
        else
            window.location.reload();
    };
    EditComponent.prototype.deleteAlert = function () {
        if (alert('You\' ve successfully deleted this post!')) { }
        else
            window.location.reload();
    };
    return EditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", post_1.Post)
], EditComponent.prototype, "edited_post", void 0);
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-edit',
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css'],
        providers: [history_service_1.HistoryService]
    }),
    __metadata("design:paramtypes", [history_service_1.HistoryService,
        core_2.CookieService,
        router_1.Router])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map