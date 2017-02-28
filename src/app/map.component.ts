import { Component, ContentChild, ContentChildren, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { PostService } from './post.service';
import { CookieService } from 'angular2-cookie/core';
import './markerclusterer.js';
import { Posts } from './posts';
import { Router } from '@angular/router';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { MarkerCluster } from './marker-cluster';

declare var google: any;

@Component({
  selector: 'my-map',
  templateUrl: 'map.component.html',
  providers: [PostService]
})
export class MapComponent implements OnInit{ 

    @ViewChild(MarkerCluster) marker_cluster: MarkerCluster;


    ngAfterViewInit() {
        console.log("ngchild");
        this.selectedTitle = this.marker_cluster.selectedTitle;
        this.selectedDesc = this.marker_cluster.selectedDesc;
        this.selectedUser = this.marker_cluster.selectedUser;
    }

    handleNotify(data:string[]) {
        console.log("emit received");
        var tmp = data;
        this.selectedTitle = data[0];
        this.selectedUser = data[1];
        this.selectedEmail = data[2];
        this.selectedPhone = data[3];
        if (data[4] == "true")
            this.selectedLost = "Lost";
        else 
            this.selectedLost = "Found";
        this.selectedDate = data[5];
        this.selectedDesc = data[6];
        this.selectedUrl = data[7];

    }

    selectedTitle: string = "title";
    selectedUser:string = "name";
    selectedPhone:string = "phone";
    selectedEmail:string = "email"
    selectedDesc:string = "description";
    selectedUrl:string = "Url";
    selectedLost:string = "lost?";
    selectedDate:string;

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

    src: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    selected(imageResult: ImageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
        (imageResult.file);
        
    }

    constructor(private postService: PostService, private cookieService: CookieService, private router: Router) {}

    markers: marker[] = [];
    m: marker;

    points: any[] = [];

    getPost(): Promise<Posts[]> {
        return this.postService.getOngoingPosts().then(posts => this.posts = posts);
    }

    ngOnInit(): void {
        this.lofoemail = this.cookieService.get("lofoemail");
        if(this.lofoemail == null) {
            this.router.navigateByUrl("/login");
        }
        var promise = this.getPost();
        promise.then(posts => {
            // Here you can use the data because it's ready
            // this.myVariable = data;
            this.posts = posts;
            var newPostIcon: string;

            for (var i in posts) {
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
                    title: singlePost.title,
                    name: singlePost.fullname,
                    poster: singlePost.poster,
                    contact: singlePost.contact,
                    lost: singlePost.lost,
                    createTime: singlePost.createTime,
                    lat: singlePost.locationX,
                    lng: singlePost.locationY,
                    description: singlePost.description,
                    imgUrl: singlePost.photo,
                    iconUrl: newPostIcon,
                    draggable: false,
                }
                this.markers.push(newMarker);
            }
          }).catch((ex) => {});
          setInterval(() => this.ngAfterViewInit, 1000);
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
        if (this.tag == null) {
            alert("Please choose a Genre");
            return;
        }
        var promise = this.postService.createPost(this.post)
            .then((post: Posts) => {
                this.post = post;
                if (this.post == null) {
                    alert("Fail to create a new post");
                }
                else {
                    alert("Create Successfully");
                    window.location.reload();
                }
        });



        var newPostIcon: string;

        if (this.post.tag == 0) {
            newPostIcon = 'assets/icon_phone.png';
        } else if (this.post.tag == 1) {
            newPostIcon = 'assets/icon_key.png';
        } else if (this.post.tag == 2) {
            newPostIcon = 'assets/icon_wallet.png';
        } else if (this.post.tag == 3) {
            newPostIcon = 'assets/icon_backpack.png';
        } else if (this.post.tag == 4) {
            newPostIcon = 'assets/icon_cloth.png';
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

    mapItem: String = 'All';
    mapLostOrFound: String = 'All';
    mapExpired: String = 'All';

    newMarker: marker;

    updateFilter() {
        alert("To be implemented");
    }

    clickedMarker(marker:marker) {
        console.log(this.selectedTitle);
    }

    onNotify(message:string):void {
        alert(message);
      }

    mapClicked($event:any) {
        this.ngAfterViewInit();
        console.log(this.selectedTitle);
        
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