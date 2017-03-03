import { Directive, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { GoogleMap, Marker } from 'angular2-google-maps/core/services/google-maps-types';
import { Observable } from 'rxjs';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: 'marker-cluster'
})
export class MarkerCluster {

  markerCluster: any;

  @Input() points: any[]; 

  selectedTitle:string = "nice marker";
  selectedUser:string;
  selectedPhone:string;
  selectedDesc:string;
  selectedUrl:string;
  
  @Output() notify: EventEmitter<string[]> = new EventEmitter<string[]>();

  notifyComplete(title: string, name:string, poster:string, contact:string, lost:boolean, createTime:Date ,desc:string, url:string) {
    var data = new Array();
    data.push(title);
    data.push(name);
    data.push(poster);
    data.push(contact);
    data.push(lost);
    data.push(createTime);
    data.push(desc);
    data.push(url);
    this.notify.emit(data);
  }

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {
  }

  clearMap() {
    this.markerCluster.clearMarkers();
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

      let infows = [];


      Observable
        .interval(500)
        //.skipWhile((s) => this.points == null || this.points.length <= 0)
        .take(1)
        .subscribe(() => {
        for (let point of this.points) {

          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(point.lat, point.lng),
            icon:point.iconUrl,
          });

          var type;
          if (point.lost == true) {
            type = "Lost";
          } else {
            type = "Found";
          }

          var contentStr = '<strong>' + type + '</strong>' + '<br>' + '<strong>' + point.name + '</strong>';

          let infowindow = new google.maps.InfoWindow({
            content: contentStr
          });

          infows.push(infowindow);

          marker.addListener('click', function() {

            tpThis.notifyComplete(point.title, point.name, point.poster, point.contact, point.lost, point.createTime, point.description, point.imgUrl);
            tpThis.setValue(point.name, point.title, point.description);
            for (var i=0;i<infows.length;i++) {
               infows[i].close();
            }
            infowindow.open(map, this);
            var sidebar = document.getElementById('sidebar');
            sidebar.style.display = 'block';

            google.maps.event.addListener(infowindow,'closeclick',function(){
              sidebar.style.display = 'none';
            });
          }),

          markers.push(marker);
        }

        map.addListener('click', function() {
          for (var i=0;i<infows.length;i++) {
            infows[i].close();
          }
          var sidebar = document.getElementById('sidebar');
          sidebar.style.display = 'none';
        });

        tpThis.markerCluster = new MarkerClusterer(map, markers, options);
        tpThis.markerCluster.addListener('clusterclick', function() {
        });
      })
    });
  }

  setValue(name: string, title:string, desc:string) {
    this.selectedTitle = title;
    this.selectedDesc = desc;
    this.selectedUser = name;
  }
}