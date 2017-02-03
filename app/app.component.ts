import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  styleUrls: ['/app/app.component.css'],
})
export class AppComponent  { 
	title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;
}
