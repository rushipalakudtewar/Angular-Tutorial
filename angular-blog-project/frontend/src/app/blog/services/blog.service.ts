import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogListModel } from '../blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl="http://localhost:8000/api/v1";
  constructor(private http:HttpClient) { }
  getAllBlogs(currentPage:number,itemsPerPage:number,searchQuery:string):Observable<BlogListModel>
  {
    return this.http.get<BlogListModel>(`${this.apiUrl}/getblogs?page=${currentPage}&pageSize=${itemsPerPage}&searchQuery=${searchQuery}`,{withCredentials:true})
  }

  createBlog(data:any):Observable<BlogListModel>
  {
    return this.http.post<BlogListModel>(`${this.apiUrl}/createblog`,data,{withCredentials:true})
  }

  updateBlog(id:any,data:any):Observable<BlogListModel>
  {
    return this.http.put<BlogListModel>(`${this.apiUrl}/updateblog/${id}`,data,{withCredentials:true})
  }
  deleteBlog(id:any):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/deleteblog/${id}`,{withCredentials:true})
  }

}
