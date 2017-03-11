import { Component, ContentChild, ContentChildren, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
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
import * as _ from 'lodash';

@Component({
  selector: 'my-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [PostService]
})
export class MapComponent implements OnInit{ 

    @ViewChild(MarkerCluster) marker_cluster: MarkerCluster;
    @ViewChild('lgModal') modal: any;

    isCollapsed:boolean = true;

    ngAfterViewInit() {
        this.selectedTitle = this.marker_cluster.selectedTitle;
        this.selectedDesc = this.marker_cluster.selectedDesc;
        this.selectedUser = this.marker_cluster.selectedUser;
    }

    handleNotify(data:string[]) {
        var tmp = data;
        this.selectedTitle = data[0];
        this.selectedUser = data[1];
        this.selectedEmail = data[2];
        this.selectedPhone = data[3];
        if (data[4] == "true")
            this.selectedLost = "Lost";
        else 
            this.selectedLost = "Found";
        this.selectedDate = new Date(data[5]);
        this.selectedDesc = data[6];
        this.selectedUrl = data[7];
    }

    success:boolean = false;

    imageURL: string;
    selectedTitle: string = "title";
    selectedUser:string;
    selectedPhone:string;
    selectedEmail:string;
    selectedDesc:string;
    selectedUrl:string;
    selectedLost:string;
    selectedDate:Date;

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
    lost: string = "true";
    lofoemail: string;
    startDate: any;
    endDate: any;

    tags: string[] = [
        'Phone',
        'Key',
        'Wallet',
        'Bag',
        'Cloth'
    ]

    src: File;
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    // selected(imageResult: ImageResult) {
    //     this.src = imageResult.resized
    //         && imageResult.resized.dataURL
    //         || imageResult.dataURL;
    //     console.log(imageResult.file);
    //     this.postService.uploadImage(this.src)
    //         .then((imageURL: string) => {
    //             this.imageURL = imageURL;
    //             console.log(this.imageURL);
    //     });


    // }

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
        this.addNewMarker();
    }

    addNewMarker(): void {
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
            this.marker_cluster.handleMap();

          }).catch((ex) => {});
          setInterval(() => this.ngAfterViewInit, 1000);
    }

//     onClick(): void {
// =======
//             console.log(posts);

//             this.postsToMarkers(this.posts);
//           }).catch((ex) => {
//             console.log(ex);
//           }
//         );
//         console.log(this.posts);
//     }

    postsToMarkers(posts: Posts[]): void{
        var newPostIcon: string;

        this.markers = [];
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
        // this.post.createTime = new Date();
        // this.post.modifiedTime = new Date();
        this.post.createTime = new Date(2016, 10, 10);
        this.post.modifiedTime = new Date(2016, 10, 10);
        if (this.lost == 'true') this.post.lost = true;
        else if (this.lost == 'false') this.post.lost = false;
        if (this.tag == null) {
            alert("Please choose a Genre");
            return;
        }
        if (this.title == null) {
            alert("Title can not be empty");
            return;
        }
        if (this.description == null) {
            alert("Description can not be empty");
            return;
        }
        if (this.photoUrl == null) {
            alert("Please include a photo in your");
            return;
        }
        var promise = this.postService.createPost(this.post)
            .then((post: Posts) => {
                this.post = post;
                if (this.post == null) {
                    this.success = true;
                    alert("Fail to create a new post");
                }
                else {
                    alert("Create Successfully");
                    this.modal.hide();
                    //window.location.reload();
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
        this.newMarker = null;
        this.fullname = null;
        this.title = null;
        this.description = null;
        this.photoUrl = null;
        this.phone = null;
        this.tag = -1;
        this.markers = [];
        this.addNewMarker();
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

    mapItem: string = 'All';
    mapLostOrFound: string = 'All';
    mapExpired: string = 'All';

    newMarker: marker;

 
    
    updateFilter() {
        var sidebar = document.getElementById('sidebar');
        sidebar.style.display = 'none';
        this.marker_cluster.clearMap();

        var byTag;
        var byDate;
        var byLost;
        var lost;

        function isEqual(post1, post2) {
            if (post1._id == post2._id) {
                return true;
            }
            else {
                return false;
            }
        }
        var i = this.tags.indexOf(this.mapItem);
        this.postService.getScreenedPostsByTag(i).then(posts => {
            byTag = posts;
            this.postService.getScreenedPostsByDate(this.startDate, this.endDate).then(posts => {
                byDate = posts;
                if (this.mapLostOrFound == "Lost") {
                    lost = true;
                }
                else if (this.mapLostOrFound == "Found") {
                    lost = false;
                }
                else {
                    lost = undefined;
                }
                this.postService.getScreenedPostsByLost(lost).then(posts => {
                    byLost = posts;
                    this.postsToMarkers(_.intersectionWith(byTag, byDate,byLost, isEqual));

                })
            });
        });
        this.marker_cluster.handleMap();
    }
    
    onNotify(message:string):void {
        alert(message);
      }

    mapRightClicked($event:any) {
        this.ngAfterViewInit();        
        var newMarker = {
            name: 'New Post',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            item: 'none',
            draggable: false,
        }
        this.newMarker = newMarker;
    }

    mapClicked($event:any) {
        this.newMarker = null;
    }


    markerDragEnd(marker:any, $event:any) {
        console.log('dragEnd', marker, $event);
    }

    newPostOnMap() {
        console.log('hello');
        var newMarker = this.markers[this.markers.length-1];
    }

    cluster($maker:any, $event:any) {
    }

    cancelPost($event:any) {
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
        var dateFormat = require('dateformat');
        this.startDate = event.beginJsDate;
        this.endDate = event.endJsDate;
        this.updateFilter();
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