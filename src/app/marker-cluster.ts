import { Directive, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import { Observable } from 'rxjs';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: 'marker-cluster'
})
export class MarkerCluster implements OnInit {

  @Input() points: any[]; 

  selectedTitle:string = "nice marker";
  selectedUser:string;
  selectedPhone:string;
  selectedDesc:string;
  selectedUrl:string;
  
  @Output() notify: EventEmitter<string[]> = new EventEmitter<string[]>();

  notifyComplete(name: string, title:string, desc:string, url:string) {
    var data = new Array();
    data.push(name);
    data.push(title);
    data.push(desc);
    data.push(url);
    this.notify.emit(data);
    this.selectedTitle = title;
    this.selectedDesc = desc;
    this.selectedUser = name;
    console.log(this.selectedTitle);
  }

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  ngOnInit() {
    console.log("inside cluster");
    this.handleMap();
  }

  handleMap() {
    let tpThis = this;
    this.gmapsApi.getNativeMap().then(map => {

      var backpackUrl: string = 'app/icon_backpack.png';
      var walletUrl: string = 'app/icon_wallet.png';
      var keyUrl: string = 'app/icon_key.png';
      var cellphoneUrl: string = 'app/icon_phone.png';
      var clothUrl: string = 'app/icon_cloth.png';
      
      let markerIcon = {
        url: "assets/marker.png", // url
        scaledSize: new google.maps.Size(35, 35)
      };
    
    
      let style = {
        url: "assets/cluster.png",
        height: 40,
        width: 40,
        textColor: '#FFF', 
        textSize: 11,  
        backgroundPosition: "center center"
      }; 

      let options = {
        imagePath: "/assets/cluster",
        gridSize: 70,
        styles: [style, style, style]
      };
    
      let markers = [];


      Observable
        .interval(500)
        .skipWhile((s) => this.points == null || this.points.length <= 0)
        .take(1)
        .subscribe(() => {
        for (let point of this.points) {
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(point.lat, point.lng),
            icon:point.iconUrl,
          });

          var contentStr = '<strong>' + point.name + '</strong>' + '<br>' + '<strong>' + point.description + '</strong>';

          let infowindow = new google.maps.InfoWindow({
            content: contentStr
          });

          marker.addListener('click', function() {
            console.log(tpThis.selectedTitle);
            tpThis.notifyComplete(point.name, point.title, point.description, point.imgUrl);
            console.log("emiting");
            tpThis.setValue(point.name, point.title, point.description);
            console.log("clicked marker: " + point.name);

            infowindow.open(map, marker);
            var sidebar = document.getElementById('sidebar');
            // if (sidebar.style.display != 'none') {
            //     sidebar.style.display = 'none';
            // } else {
            //     sidebar.style.display = 'block';
            // }
          }),

          markers.push(marker);
        }

        var markerCluster = new MarkerClusterer(map, markers, options);
        markerCluster.addListener('clusterclick', function() {
          console.log("BOOMBOOM");
        //document.getElementById('newMarker').style.display = 'none';
        });
      })
    });
  }

  setValue(name: string, title:string, desc:string) {
    this.selectedTitle = title;
    this.selectedDesc = desc;
    this.selectedUser = name;
    console.log(this.selectedTitle);
  }
}
