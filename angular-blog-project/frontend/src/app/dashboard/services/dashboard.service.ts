import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl="http://localhost:8000/api/v1";
  constructor(private http:HttpClient) { }

  getAllPublishedBlogs(currentPage:number,totalPages:number,searchQuery:string)
  {
    return this.http.get(`${this.apiUrl}/getpublishedblogs?page=${currentPage}&pageSize=${totalPages}&searchQuery=${searchQuery}`,{withCredentials:true})
  }
}
