import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Posts} from './posts';
import { CookieService } from 'angular2-cookie/core';

import {PostService} from './post.service';

@Component({
	selector: 'expired',
	templateUrl:'./expired.component.html',
	styleUrls: ['expired.component.css'],
	providers:[PostService]
})
export class ExpiredComponent implements OnInit{

	lofoemail: string;
	sample_posts:Posts[];

	constructor(
		private postService: PostService, private router: Router, private cookieService: CookieService){}



	getPosts() : void {
		this.postService.getCompletePosts()
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