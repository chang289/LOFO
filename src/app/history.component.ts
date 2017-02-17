import { Component,OnInit} from '@angular/core';

import {Posts} from './posts';

import {HistoryService} from './history.service';

@Component({
	moduleId: module.id,
	selector: 'my-history',
	templateUrl:'./history.component.html',
	styleUrls: ['history.component.css'],
	providers:[HistoryService]
})
export class HistoryComponent implements OnInit{ 

	sample_posts:Posts[];

	constructor(
		private historyService: HistoryService){}


	getPosts() : void {
		this.historyService.getPosts()
		.then(sample_posts=>this.sample_posts=sample_posts);
	}

	ngOnInit(): void {
		this.getPosts();
	}
}