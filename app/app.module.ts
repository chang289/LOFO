import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

//for datepicker
import { MyDatePickerModule } from 'mydatepicker';

//for map
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [ 
  	BrowserModule,
  	CommonModule,
    FormsModule,
    MyDatePickerModule,
    MyDateRangePickerModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9uiQRUlJhkX7x0Vf0ZAvzOF-qcXO-O5Y'
    }) 
  ],
  providers: [],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
