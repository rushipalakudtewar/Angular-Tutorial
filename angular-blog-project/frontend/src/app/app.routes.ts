import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { BLOG_ROUTES } from './blog/blog.routes';
import { AuthGuard } from './auth.guard';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"",
        // redirectTo:'auth/login',
        redirectTo:'publishedblogs',
        pathMatch:"full"
    },
    {
        path:"publishedblogs",
        loadComponent:()=>import('./dashboard/dashboard.component').then(m=>m.DashboardComponent),
        data: { section: 'publishedblogs' } ,
    },
    {
        path:'auth',
        loadChildren:()=>import('./auth/auth.routes').then(m=>m.AUTH_ROUTES)
    },
    {
        path:'blog',
        loadChildren:()=>import('./blog/blog.routes').then(m=>m.BLOG_ROUTES),
        data: { section: 'blog' } 
    },
    {
        path:'admin',
        loadChildren:()=>import('./admin/admin.routes').then(m=>m.ADMIN_ROUTES),
        data: { section: 'admin' }
    },
    {
        path:"**",
        component:PageNotFoundComponent
    },

    
 
];
