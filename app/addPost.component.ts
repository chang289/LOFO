import { Component, Input } from '@angular/core';
@Component({
  selector: 'add-post',
  templateUrl: '/html/addPost.component.html',
})
export class addPostComponent  { 
	str='abc';
	title: string;
	description: string;
	fullname: string;
	phone: string;
	email: string;
	tag: string;
	photoUrl: string
	onClick(): void {
		console.log(this.photoUrl);
	}
}
