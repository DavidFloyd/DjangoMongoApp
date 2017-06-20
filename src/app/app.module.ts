import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AuthService} from './auth.service';

import {MaterialModule} from '@angular/material';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskFormComponent} from './task-list/task-form/task-form.component';

import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {TaskListService} from './task-list/task-list.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule, MaterialModule,
  ],
  providers: [AuthService, TaskListService, {
    provide: AuthHttp,
    useFactory: authHttpFactory,
    deps: [Http, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function authHttpFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}
