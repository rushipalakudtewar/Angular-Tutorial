import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderrComponent } from './headerr/headerr.component';
import { TemplateForm1Component } from './template-form1/template-form1.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReactiveForm1Component } from './reactive-form1/reactive-form1.component'
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    HeaderrComponent,
    TemplateForm1Component,
    ReactiveForm1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
