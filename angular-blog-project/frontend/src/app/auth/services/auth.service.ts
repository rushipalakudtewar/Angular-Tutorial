import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl="http://localhost:8000/api/v1";
  constructor(private http:HttpClient,private router:Router) { }


  login(data:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/login`,data,{
      withCredentials:true
    })
  }

  register(data:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/register`,data,{withCredentials:true})
  }

  logout():Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`,{},{
      withCredentials:true
    })
  }
  getToken()
  {
    return localStorage.getItem('token');
  }

  getUser():Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/getuser`,{withCredentials:true})
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

  updateUserDetails(data:UserModel):Observable<UserModel>
  {
    console.log("from service",data);
    
    return this.http.put<UserModel>(`${this.apiUrl}/updatedetails`,data,{withCredentials:true})
  }

  updateProfilePicture(formData:FormData):Observable<UserModel>
  {
    return this.http.put<UserModel>(`${this.apiUrl}/updateprofile`,formData,{withCredentials:true})
  }

}
