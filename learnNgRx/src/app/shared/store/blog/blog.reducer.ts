import {  createReducer, on } from "@ngrx/store";
import { BlogState } from "./blog.state";
import { addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadSpinner, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./blog.actions";

const _blogReducer = createReducer(BlogState,
    on(loadblog,(state)=>{
        return {
            ...state,
            IsLoader:false
        }
    }), 
    on(loadblogsuccess,(state,action)=>{    
        return {
            ...state,
            bloglist:[...action.bloglist],
            Errormessage:'',
            IsLoader:false
        }
    }),
    on(loadblogfail,(state,action)=>{    
        console.log(action.Errortext);
        return {
            ...state,
            bloglist:[],
            Errormessage:action.Errortext.message,
            IsLoader:false
        }
    }),
    // on(addblog,(state,action)=>{
    //     const _blog = {...action.bloginput};
    //     _blog.id=state.bloglist.length+1;

    //     return {
    //         ...state,
    //         bloglist:[...state.bloglist,_blog]
    //     }
    // }),
    on(addblogsuccess,(state,action)=>{
        const _blog = {...action.bloginput};
        // _blog.id=state.bloglist.length+1;

        return {
            ...state,
            bloglist:[...state.bloglist,_blog],
            IsLoader:false
        }
    }),
    // on(updateblog,(state,action)=>{
    //     const _blog = {...action.bloginput};
    //     const updatedblog = state.bloglist.map(blog=>{
    //         return _blog.id===blog.id? _blog : blog;
    //     })
   
    //     return {
    //         ...state,
    //         bloglist:updatedblog    
    //     }
    // }),
    on(updateblogsuccess,(state,action)=>{
        const _blog = {...action.bloginput};
        const updatedblog = state.bloglist.map(blog=>{
            return _blog.id===blog.id? _blog : blog;
        })
   
        return {
            ...state,
            bloglist:updatedblog,
            IsLoader:false
        }
    }),
    on(deleteblogsuccess,(state,action)=>{
        const updatedblog = state.bloglist.filter(blog=>{
            return blog.id!==action.blogid; 
        })
   
        return {
            ...state,
            bloglist:updatedblog,
            IsLoader:false 
        }
    }),
    on(loadSpinner,(state,action)=>{
        
        return {
            ...state,
            IsLoader:action.isloader    
        }
    }),

)

export function blogReducer(state:any,action:any)
{
    return _blogReducer(state,action);
}
