import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

import { PostService } from './post.service';
import { UserService } from './user.service';
import { NavbarService } from './navbar.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NavComponent,
    CreatePostComponent,
    ListPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AsyncLocalStorageModule,
    RouterModule.forRoot([
      { path:'', component: LoginComponent },
      { path:'register', component: RegistrationComponent },
      { path:'home/:username', component: HomeComponent },
      { path:'home/:username/createPost', component: CreatePostComponent },
      { path:'home/:username/listPost', component: ListPostComponent}
    ])
  ],
  providers: [UserService, NavbarService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
