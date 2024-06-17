import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogListModel } from '../../blog/blog.model';
import { UserModel } from '../../auth/auth.model';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl="http://localhost:8000/api/v1";

  constructor(private http:HttpClient) { }

  getAllUsers(currentPage:number,itemPerPage:number,searchQuery:string):Observable<{user:UserModel[]}>
  {
    return this.http.get<{user:UserModel[]}>(`${this.apiUrl}/getallusers?page=${currentPage}&pageSize=${itemPerPage}&searchQuery=${searchQuery}`,{withCredentials:true})
  }

  getCountValue():Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/getcounts`,{withCredentials:true})
  }

  
  getAllBlogs(currentPage:number,itemPerPage:number,searchQuery:string):Observable<BlogListModel>
  {
    return this.http.get<BlogListModel>(`${this.apiUrl}/getallblogs?page=${currentPage}&pageSize=${itemPerPage}&searchQuery=${searchQuery}`,{withCredentials:true})
  }

  deleteBlog(id:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/deleteblogbyadmin/${id}`,{withCredentials:true})
  }
  deleteUser(id:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/deleteuser/${id}`,{withCredentials:true})
  }

  publishStatus(id:number,publish:boolean):Observable<BlogListModel>
  {
    return this.http.put<BlogListModel>(`${this.apiUrl}/updatepublish/${id}`,{publish},{withCredentials:true});
  }
}
