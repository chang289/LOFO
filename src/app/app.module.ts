import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { MarkerCluster } from './marker-cluster';

import { MyDateRangePickerModule } from 'mydaterangepicker';

//for datepicker



//for map
import { AgmCoreModule } from 'angular2-google-maps/core';

import { CollapseModule, ModalModule, ButtonsModule, TabsModule, DropdownModule } from 'ng2-bootstrap';
import { PipiComponent } from './pipi.component';
import { MapComponent } from './map.component';
import { HistoryComponent } from './history.component';
import { ExpiredComponent } from './expired.component';
import { EditComponent } from './edit.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import {PathLocationStrategy, LocationStrategy,HashLocationStrategy} from '@angular/common';
import { myDateRangePickerDirective } from './my-date-range-picker.directive'
import { ImageUploadModule } from 'ng2-imageupload';
const APP_DECLARATION = [
    AppComponent
];

@NgModule({
  imports: [ 
    BrowserModule,
    CommonModule,
    FormsModule,
    MyDateRangePickerModule,
    HttpModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    DropdownModule.forRoot(),
    ImageUploadModule,
    RouterModule.forRoot([
        {
          path: '',
          redirectTo: '/pipi',
          pathMatch: 'full'
        },
        {
          path: 'pipi',
          component: PipiComponent
        }
        // },
        // {
        //   path: 'map',
        //   component: MapComponent
        // },
        // {
        //   path: 'history',
        //   component: HistoryComponent
        // },
        // {
        //   path: 'login',
        //   component: LoginComponent
        // },
        // {
        //   path: 'register',
        //   component: RegisterComponent

        // },
        // {
        //   path: 'expired',
        //   component: ExpiredComponent
        // }
      ]),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9uiQRUlJhkX7x0Vf0ZAvzOF-qcXO-O5Y'
    }),
    CollapseModule.forRoot()
  ],
  exports: [RouterModule],

  providers: [ CookieService, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  declarations: [ AppComponent, PipiComponent, MapComponent, APP_DECLARATION, HistoryComponent, EditComponent, RegisterComponent, LoginComponent, ExpiredComponent, MarkerCluster ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }