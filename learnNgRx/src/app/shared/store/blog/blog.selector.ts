import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BlogModel, Blogs } from "./blog.model";

const getBlogState = createFeatureSelector<Blogs>('blog')

export const getBlog = createSelector(getBlogState,(state)=>{
    return state.bloglist;
})
export const getBlogById = (blogid:number)=>createSelector(getBlogState,(state)=>{
    return state.bloglist.find((blog:BlogModel)=>blog.id===blogid) as BlogModel;
})

export const getBlogInfo = createSelector(getBlogState,(state)=>{
    return state;
})
export const getSpinnerState = createSelector(getBlogState,(state)=>{
    return state.IsLoader;
})