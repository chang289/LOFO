import { Component, OnInit,Input} from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/modal';
import { Router } from '@angular/router';
import { Posts } from './posts';
import { Users } from './users';

import { HistoryService } from './history.service';
import { UserService } from './user.service';
import { CookieService } from 'angular2-cookie/core';



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
		private userService:UserService,
		private cookieService: CookieService
		){}


	sample_posts:Posts[];

    user: Users;
	confirm_email:string;
	confirm_password:string;
	lofoemail:string;

	@Input() edited_post: Posts;


	tag: number = 0;
	
	editClicked() : void {
		console.log(this.edited_post.tag);
		this.tag = this.edited_post.tag;
	}

	//BUG1 :title or description must be entered
	//REG BUG1 : must reload the page otherwise title or description could not be displayed.
	//BUG2 : A post must have title and description. So users cannot remove the title and description.
	Edit(): void {
		this.tag = this.edited_post.tag;
		if(this.edited_post.title.length == 0) {
			alert("Edit Failed:Please enter title!");
			window.location.reload();
		}else if(this.edited_post.description.length == 0) {
			alert("Edit Failed:Please enter description!");
			window.location.reload();
		}
		else{
			this.historyService.updatePosts(this.edited_post)
			.then((info) => {
				if (info == null) {
					alert("Edit Failed");
					window.location.reload();
				}
				else {
					alert("Edit Success");
					window.location.reload();
				}
			});
		}

	}
	Delete(): void {
		var promise = this.historyService.deletePostByID(this.edited_post)
            .then((info) => {
            	if (info == null) {
            		alert("Delete Failed");
					window.location.reload();
            	}
            	else {
            		alert("Delete Success");
            		window.location.reload();
            	}
        });
			
		console.log(promise);

	}
	//BUG1: should not be able to confirm user self.
	Confirm(): void {
		this.user = new Users();
        this.user.email = this.confirm_email;
        this.user.password = this.confirm_password;
        this.lofoemail = this.cookieService.get("lofoemail") 

        var promise = this.userService.loginUser(this.user)
            .then((user: Users) => {
                this.user = user;
                if (this.user == null) {
                    alert("Confirm Failed:Incorrect Email or Password!");
                }else if (this.lofoemail == user.email){
                    alert("Confirm Failed:Confirmer Must Be Another User!");
                }else {
                	this.edited_post.complete = true;
                	this.edited_post.confirmer = this.confirm_email;
                	
					this.historyService.updatePosts(this.edited_post)
						.then((info) => {
							if (info == null) {
								alert("Confirm Failed:Failed to Update!");
								window.location.reload();
							}
							else {
								console.log(this.edited_post.confirmer);
								alert("Confirm Successed:You've Confirmed Yours Post!");
								window.location.reload();
							}
						});
					
                }
        });

	}




}