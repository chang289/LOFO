import { Component, OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import {Posts} from './posts';

@Component ({
	moduleId: module.id,
	selector: 'my-infobox',
	templateUrl: './infoBox.component.html',
	providers:[]
})
export class EditComponent {

	constructor(){}

	@Input() selectedTitle: string;
    @Input() selectedUser:string;
    @Input() selectedPhone:string;
    @Input() selectedDesc:string;
}