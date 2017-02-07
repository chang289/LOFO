import { Component, ContentChild, ContentChildren, OnInit } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import './markerclusterer.js';
import { addPostComponent } from './addPost.component';
declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  styleUrls: ['/app/app.component.css'],
})
export class AppComponent { 

	title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;

	googleMarkers : any;
	MarkerClusterer : any;
	map : any;

    backpackUrl: string = 'app/backpack_icon.png';
    walletUrl: string = 'app/wallet_icon.png';
    keyUrl: string = 'app/key_icon.png';
    cellphoneUrl: string = 'app/cellphone_icon.png';
    clothUrl: string = 'app/cloth_icon.png';

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

    newMarker: marker;
    constructor() { }

    clickedMarker(marker:marker, index:number) {
        
        console.log("clicked marker: " + marker.name + " at index " + index + " length is " + this.markers.length);
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.width != '0%') {
            sidebar.style.width = '0%';
        } else {
            sidebar.style.width = '20%';
        }
    }

    mapClicked($event:any) {

        console.log('Map clicked');
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: false,
        }
        this.newMarker = newMarker;
    }

    markerDragEnd(marker:any, $event:any) {
        console.log('dragEnd', marker, $event);
    }

    newPostOnMap() {
        console.log('hello');
        var newMarker = this.markers[this.markers.length-1];
        console.log(newMarker.lat);
        console.log(newMarker.lng);
    }

    cluster($maker:any, $event:any) {
    	console.log('zoomed');
    }

    cancelPost($event:any) {
        console.log("cancel");
        this.newMarker = null;
    }


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
    iconUrl?: string;
}

