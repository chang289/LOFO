import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Posts} from './posts';
import { CookieService } from 'angular2-cookie/core';

import {PostService} from './post.service';

@Component({
	selector: 'expired',
	templateUrl:'./expired.component.html',
	styleUrls: ['history.component.css'],
	providers:[PostService]
})
export class ExpiredComponent implements OnInit{

	lofoemail: string;
	sample_posts:Posts[];
	len: number;

	description:string;
	contact:string;


	constructor(
		private postService: PostService, private router: Router, private cookieService: CookieService){}



	getPosts() : void {
		this.postService.getCompletePosts()
		.then(sample_posts=>{
			this.sample_posts=sample_posts;
			if(this.sample_posts != null){ 
				this.len = this.sample_posts.length;
			}else{
				this.len = 0;
			}
		});

	}
	Report():void{
		this.postService.reportPost(this.description,this.contact)
		.then((info) => {
			if (info == null) {
				alert("Report failed");
				window.location.reload();
			}
			else {
				alert("You've reported this post successfully.");
				window.location.reload();
			}
		});
	}

	ngOnInit(): void {
	    this.lofoemail = this.cookieService.get("lofoemail");

		if(this.lofoemail == null) {
        	this.router.navigateByUrl("/login");
    	}
		this.getPosts();
	}
}