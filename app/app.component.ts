import { Component } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  styleUrls: ['/app/app.component.css'],
})
export class AppComponent  { 
	title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;

    markers: marker[] = [
        {
            name: 'LWSN',
            lat: 40.427704,
            lng: -86.916937,
            draggable: false,
        },
        {
            name: 'PMU',
            lat: 40.424660,
            lng: -86.911482,
            draggable: false,
        },
        {
            name: 'PHYS',
            lat: 40.430124,
            lng: -86.913057,
            draggable: false,
        },
        {
            name: 'ARMS',
            lat: 40.431184,
            lng: -86.915602,
            draggable: false,
        },
        {
            name: 'KRAN',
            lat: 40.423975,
            lng: -86.910803,
            draggable: false,
        },
    ];
    constructor() { }

	//-------------for datepicler-----------------
	private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        height: '34px',
        width: '200px',
    };

    onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    }
    
	//-------------for datepicler-----------------
    private _opened: boolean = false;
    private _closeOnClickOutside: boolean = true;
	private _toggleSidebar() {
		this._opened = !this._opened;
	}
}

interface marker {
    name?: string;
    lat: number;
    lng: number;
    draggable: boolean;
}

