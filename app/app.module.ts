import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MyDateRangePickerModule } from 'mydaterangepicker';

//for datepicker
import { MyDatePickerModule } from 'mydatepicker';

//for sidebar
import { SidebarModule } from 'ng-sidebar';

//for map
import { AgmCoreModule } from 'angular2-google-maps/core';

import { CollapseModule, ModalModule, ButtonsModule } from 'ng2-bootstrap';
import { PipiComponent } from './pipi.component';
import { MapComponent } from './map.component';

@NgModule({
  imports: [ 
  	BrowserModule,
  	CommonModule,
    FormsModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    SidebarModule,
    HttpModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot([
        {
          path: '',
          redirectTo: '/map',
          pathMatch: 'full'
        },
        {
          path: 'pipi',
          component: PipiComponent
        },
        {
          path: 'map',
          component: MapComponent
        }
      ]),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9uiQRUlJhkX7x0Vf0ZAvzOF-qcXO-O5Y'
    }),
    CollapseModule.forRoot()
  ],
  providers: [],
  declarations: [ AppComponent, PipiComponent, MapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
