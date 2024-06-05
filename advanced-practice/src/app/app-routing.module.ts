import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { TemplateForm1Component } from './template-form1/template-form1.component';
import { ReactiveForm1Component } from './reactive-form1/reactive-form1.component';

const routes: Routes = [
  {
    path:'user',
    component:UserListComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'template',
    component:TemplateForm1Component
  },
  {
    path:'reactive',
    component:ReactiveForm1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
