import { Component } from "@angular/core";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";
import { Routes } from "@angular/router";
import { BlogUserdetailsComponent } from "./blog-userdetails/blog-userdetails.component";
import { BlogComponent } from "./blog.component";
import { AuthGuard } from "../auth.guard";

export const BLOG_ROUTES:Routes = [
    {
        path:'',
        component:BlogComponent,
        canActivate:[AuthGuard],
        children:[
            {
                path:'',
                component:BlogListComponent
            },
            {
                path:'createblog',
                component:CreateBlogComponent
            },
            {
                path:'userdetails',
                component:BlogUserdetailsComponent
            }
        ]
    }
    
]

