import { Component, ContentChild, ContentChildren, OnInit } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { PostService } from './post.service';
import './markerclusterer.js';
import { Posts } from './posts';
declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  styleUrls: ['/app/app.component.css'],
  providers: [PostService]
})
export class AppComponent implements OnInit{ 

	// title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;
    str='abc';

    title: string;
    description: string;
    fullname: string;
    phone: string;
    email: string; 
    tag: number;
    post: Posts;
    photoUrl: string;


    tags: string[] = [
        'Phone',
        'Key',
        'Wallet',
        'Bag',
        'Cloth'
    ]

    constructor(private postService: PostService) {
        this.postService.getOngoingPosts().then(posts => this.posts = posts);

    }

    posts: Posts[] = []; 
    markers: marker[] = [];
    m: marker;

    ngOnInit(): void {
        console.log(this.posts);

    }

    onClick(): void{
        console.log(this.tag);
        this.post = new Posts();
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tag;
        this.post.photo = this.phone;
        this.post.locationX = this.newMarker.lat;
        this.post.locationY = this.newMarker.lng;
        this.post.createTime = new Date();
        this.post.modifiedTime = new Date();
        this.postService.createPost(this.post);


        var newPostIcon: string;

        if (this.post.tag == 0) {
            newPostIcon = 'app/icon_phone.png';
        } else if (this.post.tag == 1) {
            newPostIcon = 'app/icon_key.png';
        } else if (this.post.tag == 2) {
            newPostIcon = 'app/icon_wallet.png';
        } else if (this.post.tag == 3) {
            newPostIcon = 'app/icon_backpack.png';
        } else if (this.post.tag == 4) {
            newPostIcon = 'app/icon_cloth.png';
        }

        var newMarker = {
            name: 'New Post',
            lat: this.newMarker.lat,
            lng: this.newMarker.lng,
            iconUrl: newPostIcon,
            draggable: false,
        }
        this.markers.push(newMarker);
        this.newMarker = null;
        this.fullname = null;
        this.title = null;
        this.description = null;
        this.phone = null;
        this.tag = -1;
        //console.log(this.postService.createPost(post));
    }

	googleMarkers : any;
	MarkerClusterer : any;
	map : any;

    backpackUrl: string = 'app/backpack_icon.png';
    walletUrl: string = 'app/wallet_icon.png';
    keyUrl: string = 'app/key_icon.png';
    cellphoneUrl: string = 'app/cellphone_icon.png';
    clothUrl: string = 'app/cloth_icon.png';

    // markers: marker[] = [
    //     {
    //         name: 'Wallet_0',
    //         lat: 40.427704,
    //         lng: -86.916937,
    //         draggable: false,
    //         iconUrl: 'app/icon_wallet.png'
    //     },
    // ];

    mapItem: String = 'All';
    mapLostOrFound: String = 'All';
    mapExpired: String = 'All';

    newMarker: marker;

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
        console.log(this.posts);
        console.log('Map clicked');
        console.log($event.coords.lat);
        console.log($event.coords.lng);
        console.log(this.markers);
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            item: 'none',
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

