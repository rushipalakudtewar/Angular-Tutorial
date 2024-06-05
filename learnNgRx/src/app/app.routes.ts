import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'counter',
        pathMatch:'full'
    },

    {
        path:'counter',
        component:CounterComponent
    },
    {
        path:'blog',
        component:BlogComponent
    }
];
