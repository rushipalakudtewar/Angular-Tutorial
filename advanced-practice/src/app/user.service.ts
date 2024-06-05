import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activatedEmmiter = new Subject<Boolean>();
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http:HttpClient) {}
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }
} 
