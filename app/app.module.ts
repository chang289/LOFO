<<<<<<< HEAD
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { APP_BASE_HREF }  from '@angular/common';
import { HttpModule }     from '@angular/http';

import { AppComponent}        from './app.component';
import { LoginComponent }     from './login.component';
import { RegisterComponent }  from './register.component';
import { UserService }        from './user.service';



@NgModule({
  imports: [      //angular自带模块
  	BrowserModule,
  	FormsModule,
    HttpModule,
    RouterModule.forRoot([
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'register',
      component: RegisterComponent
    }
    ]) 
  ],
  declarations: [   //普通自定义模块
    AppComponent,
  	LoginComponent,
    RegisterComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap:    [ AppComponent]  //默认启动模块
=======
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

import { myDateRangePickerDirective } from './my-date-range-picker.directive'

const APP_DECLARATION = [
    AppComponent
];

@NgModule({
  imports: [ 
  	BrowserModule,
  	CommonModule,
    FormsModule,
    MyDateRangePickerModule,
    SidebarModule,
    HttpModule,
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot([
        {
          path: '',
          redirectTo: '/login',
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
>>>>>>> master
})

export class AppModule { }