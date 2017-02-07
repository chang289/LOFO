import { Component, Input } from '@angular/core';
import { PostService } from './post.service';
import { Posts } from './posts';

@Component({
  selector: 'add-post',
  templateUrl: '/html/addPost.component.html',
  providers: [PostService]
})
export class addPostComponent  { 
	str='abc';
	title: string;
	description: string;
	fullname: string;
	phone: string;
	email: string; 
	tag: string;
	post: Posts;
	photoUrl: string;

	constructor(private postService: PostService) { }	

	tags: number[] = [1];
	locations: number[] = [40.4247704, -86.916937];	

	onClick(): void{

		this.post = new Posts();
		this.post.fullname = this.fullname;
		this.post.title = this.title;
		this.post.description = this.description;
		this.post.tag = this.tags;
		this.post.location = this.locations;
		console.log(this.post);
		// console.log(this.postService.createPost(post));
	}

}


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
