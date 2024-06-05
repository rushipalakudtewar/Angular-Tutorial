import { routerReducer } from "@ngrx/router-store";
import { blogReducer } from "../blog/blog.reducer";
import { counterReducer } from "../counter.reducer";

export const AppState={
    counter:counterReducer,
    blog:blogReducer,
    router:routerReducer
}