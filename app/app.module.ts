import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { addPostComponent } from './addPost.component';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	ModalModule.forRoot(),
  	FormsModule,
  	HttpModule,
  ],
  declarations: [ AppComponent, addPostComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}
