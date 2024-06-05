import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../../services/master.service";
import { LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadSpinner, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./blog.actions";
import { EMPTY, catchError, exhaustMap,map, of, switchMap } from "rxjs";
import { BlogModel } from "./blog.model";
import {MatSnackBar} from "@angular/material/snack-bar"
import { EMPTY_ACTION, EmptyAction, ShowAlert } from "../global/App.action";
@Injectable()
export class BlogEffect{
    constructor(private action$:Actions, private service:MasterService,private _snackbar:MatSnackBar){}

    _blog = createEffect(()=>
        this.action$.pipe(
            ofType(LOAD_BLOG),
            exhaustMap((action)=>{
                return this.service.getAllBlogs().pipe(
                    map((data)=>{
                        return loadblogsuccess({bloglist:data});
                    }),
                    catchError((_error)=>of(loadblogfail({Errortext:_error}),loadSpinner({isloader:false})))
                )
            })
        )
    )
    _AddBlog = createEffect(()=>
            this.action$.pipe(
                ofType(addblog),
                switchMap((action)=>{
                    return this.service.createBlog(action.bloginput).pipe(
                        switchMap((data)=>of(
                            addblogsuccess({bloginput:data as BlogModel}),
                            ShowAlert({message:'Blog Created',actionResult:'pass'})
                    )),
                        catchError((_error)=>of(ShowAlert({message:"Failed to Create Blog",actionResult:'fail'}),loadSpinner({isloader:false})))
                    )
                })
            )
    )
    _UpdateBlog = createEffect(()=>
            this.action$.pipe(
                ofType(updateblog),
                switchMap((action)=>{
                    return this.service.updateBlog(action.bloginput).pipe(
                        switchMap((res)=>of(
                            updateblogsuccess({bloginput:action.bloginput}),
                            ShowAlert({message:'Updated successfully',actionResult:'pass'})
                    )),
                        catchError((_error)=>of(ShowAlert({message:'Failed to Update Blog',actionResult:'fail'}),loadSpinner({isloader:false})))
                    )
                })      
            )
    )
    _DeleteBlog = createEffect(()=>
            this.action$.pipe(
                ofType(deleteblog), 
                switchMap((action)=>{
                    return this.service.deleteBlog(action.blogid).pipe(
                        switchMap(()=>of(
                            deleteblogsuccess({blogid:action.blogid}),
                            ShowAlert({message:'Deleted Successfully',actionResult:'pass'})
                        )),
                        catchError((_error)=>of(ShowAlert({message:"Failed to Remove Blog",actionResult:'fail'}),loadSpinner({isloader:false})))
                    )
                })      
            )
    )

}