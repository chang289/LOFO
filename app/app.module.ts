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
})

export class AppModule { }