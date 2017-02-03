import { Component } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  styleUrls: ['/app/app.component.css'],
})
export class AppComponent  { 
	title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;

	private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        height: '34px',
        width: '200px',
    };

    constructor() { }
    onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    }
}