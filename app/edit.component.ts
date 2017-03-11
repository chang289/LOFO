import { Component, OnInit,Input,VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CookieService } from 'angular2-cookie/core';

import {Post} from './post';
import {HistoryService} from './history.service';


@Component ({
	moduleId: module.id,
	selector: 'my-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
	providers:[HistoryService]
})
export class EditComponent {
	constructor(
		private historyService:HistoryService,
		private cookieService: CookieService,
		private router: Router
	){}

	sample_posts:Post[];
	public selected:string;
	public tag:number = 0;
	public types:string[] =[
		'Phone',
		'Key',
		'Wallet',
		'Bag',
		'Cloth'
	]


	@Input() edited_post: Post;

	Edit(): void {
		console.log(this.edited_post);
		console.log(this.historyService.updatePosts(this.edited_post));

	}
	Delete(): void {
		console.log(this.historyService.deletePostByID(this.edited_post));
	}

	updateAlart(): void {

		if(alert('You\' ve successfully updated this post!')){}
		else window.location.reload(); 
		
	}

	deleteAlert(): void {

		if(alert('You\' ve successfully deleted this post!')){}
		else window.location.reload(); 
		
	}





}