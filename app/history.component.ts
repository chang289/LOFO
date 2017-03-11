import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import {Post} from './post';
import {HistoryService} from './history.service';


@Component({
	moduleId: module.id,
	selector: 'my-history',
	templateUrl:'./history.component.html',
	styleUrls: ['history.component.css'],
	providers:[HistoryService]
})
export class HistoryComponent implements OnInit{ 

	sample_posts:Post[];

	constructor(
		private historyService: HistoryService,
		private router: Router,
		private cookieService: CookieService
	){}


	getPosts() : void {
		this.historyService.getPosts()
		.then(sample_posts=>this.sample_posts=sample_posts);
	}

	ngOnInit(): void {
		this.getPosts();
        if (this.cookieService.get("lofoemail") == null) {
            this.router.navigateByUrl("/login");
        }
	}
}