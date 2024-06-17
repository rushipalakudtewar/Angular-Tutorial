import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateBlogsComponent } from './update-blogs/update-blogs.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path:'',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '', component: HomeComponent },
      { path: 'updateblog', component: UpdateBlogsComponent },
      { path: 'updateuser', component: UpdateUserComponent },
    ]
  }
];

