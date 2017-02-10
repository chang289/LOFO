import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

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
import { HistoryComponent } from './history.component';
import { EditComponent } from './edit.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';

const APP_DECLARATION = [
    AppComponent
];

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
        },
        {
          path: 'history',
          component: HistoryComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        }
      ]),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9uiQRUlJhkX7x0Vf0ZAvzOF-qcXO-O5Y'
    }),
    CollapseModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [ CookieService ],
  declarations: [ AppComponent, PipiComponent, MapComponent, APP_DECLARATION, HistoryComponent, EditComponent, RegisterComponent, LoginComponent ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
