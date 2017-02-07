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
var posts_1 = require('./posts');
var addPostComponent = (function () {
    function addPostComponent(postService) {
        this.postService = postService;
        this.str = 'abc';
        this.tags = [1];
        this.locations = [40.4247704, -86.916937];
    }
    addPostComponent.prototype.onClick = function () {
        this.post = new posts_1.Posts();
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tags;
        this.post.location = this.locations;
        console.log(this.post);
        // console.log(this.postService.createPost(post));
    };
    addPostComponent = __decorate([
        core_1.Component({
            selector: 'add-post',
            templateUrl: '/html/addPost.component.html',
            providers: [post_service_1.PostService]
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService])
    ], addPostComponent);
    return addPostComponent;
}());
exports.addPostComponent = addPostComponent;
// const post: Posts = { poster: 'poollenger',
// 					  fullname: 'yiyan',
// 					  title: 'hello',
// 					  description: 'Test',
// 					  tag: tags,
// 					  location: locations,
// 					  contact: ' ',
// 					  photo: ' ',
// 					  lost: true,
// 					  createTime: 0,
// 					  modifiedTime: 0,
// 					  complete: false,
// 					  confirmer: ' '
// 			};
//# sourceMappingURL=addPost.component.js.map