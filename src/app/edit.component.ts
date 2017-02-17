import { Component, OnInit,Input} from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Router } from '@angular/router';

import {Posts} from './posts';
import {HistoryService} from './history.service';

@Component ({
	moduleId: module.id,
	selector: 'my-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
	providers:[HistoryService]
})
export class EditComponent {
	constructor(private historyService:HistoryService, private router: Router){}

	sample_posts:Posts[];
	message: string;
	@Input() edited_post: Posts;

	Edit(): void {
		console.log(this.edited_post);
		console.log(this.historyService.updatePosts(this.edited_post));

	}
	Delete(): void {
		var promise = this.historyService.deletePostByID(this.edited_post);
		console.log(promise);
	}




}