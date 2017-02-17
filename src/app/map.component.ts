import { Component, ContentChild, ContentChildren, OnInit } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { PostService } from './post.service';
import { CookieService } from 'angular2-cookie/core';
import './markerclusterer.js';
import { Posts } from './posts';
import { Router } from '@angular/router';

import {Http, HttpModule} from '@angular/http'

declare var google: any;

@Component({
  selector: 'my-map',
  templateUrl: 'map.component.html',
  providers: [PostService]
})
export class MapComponent implements OnInit{ 

	// title: string = 'LOFO';
	lat: number = 40.424660;
	lng: number = -86.911482;
    zoom: number = 5;
    str='abc';
    posts: Posts[]; 
    title: string;
    description: string;
    fullname: string;
    phone: string;
    email: string; 
    tag: number;
    post: Posts;
    photoUrl: string;
    lost: string = 'true';
    lofoemail: string;

    tags: string[] = [
        'Phone',
        'Key',
        'Wallet',
        'Bag',
        'Cloth'
    ]

    constructor(private postService: PostService, private cookieService: CookieService, private router: Router, private http:Http) {
    }

    markers: marker[] = [];
    m: marker;
    points: any[] = []; 

    getPost(): Promise<Posts[]> {
        console.log("pdd");
        return this.postService.getOngoingPosts().then(posts => this.posts = posts);
    }

    ngOnInit(): void {
        this.http.get("assets/points.json").subscribe(data => {
          this.points = data.json(); 
        });
        this.lofoemail = this.cookieService.get("lofoemail");
        var promise = this.getPost();
        console.log(promise);
        promise.then(posts => {
            // Here you can use the data because it's ready
            // this.myVariable = data;
            this.posts = posts;
            console.log(posts);
            var newPostIcon: string;

            for (var i in posts) {
                console.log(i);
                var singlePost = posts[i];
                var tag = posts[i].tag;
                if (tag == 0) {
                    newPostIcon = 'assets/icon_phone.png';
                } else if (tag == 1) {
                    newPostIcon = 'assets/icon_key.png';
                } else if (tag == 2) {
                    newPostIcon = 'assets/icon_wallet.png';
                } else if (tag == 3) {
                    newPostIcon = 'assets/icon_backpack.png';
                } else if (tag == 4) {
                    newPostIcon = 'assets/icon_cloth.png';
                }

                var newMarker = {
                    name: singlePost.fullname,
                    lat: singlePost.locationX,
                    lng: singlePost.locationY,
                    iconUrl: newPostIcon,
                    draggable: false,
                }
                this.markers.push(newMarker);
            }
          }).catch((ex) => {
            console.log(ex);
          }
        );
        console.log(this.posts);
    }

    onClick(): void{
        this.post = new Posts();
        this.post.poster = this.cookieService.get("lofoemail");
        this.post.fullname = this.fullname;
        this.post.title = this.title;
        this.post.description = this.description;
        this.post.tag = this.tag;
        this.post.photo = this.photoUrl;
        this.post.contact = this.phone;
        this.post.locationX = this.newMarker.lat;
        this.post.locationY = this.newMarker.lng;
        this.post.createTime = new Date();
        this.post.modifiedTime = new Date();

        if (this.lost == 'true') this.post.lost = true;
        else if (this.lost == 'false') this.post.lost = false;
        console.log(this.postService.createPost(this.post));


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

    clickedMarker(marker:marker) {
    
        console.log("clicked marker: " + marker.name + " length is " + this.markers.length);
        var sidebar = document.getElementById('sidebar');
        if (sidebar.style.display != 'none') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'block';
        }
    }

    mapClicked($event:any) {
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

    private signOut() {
        this.cookieService.remove("lofoemail");
        this.router.navigateByUrl("/login");
    }
}



interface marker {
    name?: string;
    lat: number;
    lng: number;
    draggable: boolean;
    iconUrl?: string;
}

