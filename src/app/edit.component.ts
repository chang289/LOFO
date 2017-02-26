import { Component, OnInit,Input} from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Router } from '@angular/router';
import { Posts } from './posts';
import { Users } from './users';

import {HistoryService} from './history.service';
import { UserService } from './user.service';


@Component ({
	moduleId: module.id,
	selector: 'my-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css'],
	providers:[HistoryService,UserService]
})
export class EditComponent {

	constructor(
		private historyService:HistoryService,
		private userService:UserService
		){}


	sample_posts:Posts[];

    user: Users;
	confirm_email:string;
	confirm_password:string;

	@Input() edited_post: Posts;


	tag: number = 0;
	
	editClicked() : void {
		console.log(this.edited_post.tag);
		this.tag = this.edited_post.tag;
	}

	Edit(): void {
		this.tag = this.edited_post.tag;
		this.historyService.updatePosts(this.edited_post)
			.then((info) => {
				if (info == null) {
					alert("Edit failed");
				}
				else {
					alert("Edit success");
					window.location.reload();
				}
			});

	}
	Delete(): void {
		var promise = this.historyService.deletePostByID(this.edited_post)
            .then((info) => {
            	if (info == null) {
            		alert("Delete failed");
            	}
            	else {
            		alert("Delete success");
            		window.location.reload();
            	}
        });
			
		console.log(promise);

	}
	//should not be able to confirm self. Could be a BUG
	Confirm(): void {
		this.user = new Users();
        this.user.email = this.confirm_email;
        this.user.password = this.confirm_password;

        var promise = this.userService.loginUser(this.user)
            .then((user: Users) => {
                this.user = user;
                if (this.user == null) {
                    alert("confirm Failed");
                }
                else {
                	this.edited_post.complete = true;
                	this.edited_post.confirmer = this.confirm_email;
                	
					this.historyService.updatePosts(this.edited_post)
						.then((info) => {
							if (info == null) {
								alert("confirm failed");
							}
							else {
								console.log(this.edited_post.confirmer);
								alert("confirm success");
								window.location.reload();
							}
						});
					
                }
        });

	}




}