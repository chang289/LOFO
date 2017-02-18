import { Component,OnInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

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

	lofoemail: string;
	sample_posts:Posts[];

	constructor(
		private historyService: HistoryService, private cookieService: CookieService, private router: Router){}


	constructor(private historyService: HistoryService){}

	getPosts() : void {
		this.historyService.getPosts()
		.then(sample_posts=>this.sample_posts=sample_posts);
	}

	ngOnInit(): void {
	    this.lofoemail = this.cookieService.get("lofoemail");

		if(this.lofoemail == null) {
        	this.router.navigateByUrl("/login");
    	}
		this.getPosts();
	}
}