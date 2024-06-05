import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'products',
        pathMatch:'full'
    },
    {
        path:'counter',
        loadComponent:()=>import('./counter/counter.component').then(a=>a.CounterComponent)
    },
    {
        path:'products',
        loadComponent:()=>import('./products/products.component').then(b=>b.ProductsComponent)
    },
    {
        path:'cart',
        loadComponent:()=>import('./cart/cart.component').then(c=>c.CartComponent)
    }
];
