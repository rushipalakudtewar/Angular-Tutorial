import { Component } from '@angular/core';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users:User[]=[];
  isLoading=true;
  errorMessage:string='';
  constructor(private userService:UserService)
  {

  }
  ngOnInit():void{
    this.userService.getUsers().subscribe({
      next:(data)=>{
        this.users=data;
        this.isLoading=false
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    })
  }
}
