import { BlogModel, Blogs } from "../blog/blog.model";
import { CounterModel } from "../counter.model";

export interface AppStateModel{
    counter:CounterModel,
    blog:Blogs
}