import { Component, OnInit,Input} from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/modal';

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
	constructor(private historyService:HistoryService){}
	sample_posts:Post[];

	@Input() edited_post: Post;
	tag: number = 0;
	
	editClicked() : void {
		console.log(this.edited_post.tag);
		this.tag = this.edited_post.tag;
	}

	Edit(): void {
		this.tag = this.edited_post.tag;
		console.log(this.edited_post);
		console.log(this.historyService.updatePosts(this.edited_post));

	}
	Delete(): void {
		console.log(this.historyService.deletePostByID(this.edited_post));
	}




}