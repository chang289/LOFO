import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'pi-pi',
  template: '<h1>Pipi</h1>',
})
export class PipiComponent implements OnInit {
	constructor(private cookieService: CookieService) {}
	ngOnInit(): void{
		console.log(this.cookieService.get("username"));
	}
}