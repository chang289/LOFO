import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'pi-pi',
  template: '<h1>This website will be reopen after blackbox testing:(</h1>',
})
export class PipiComponent implements OnInit {
	constructor() {}
	ngOnInit(): void{
	}
}