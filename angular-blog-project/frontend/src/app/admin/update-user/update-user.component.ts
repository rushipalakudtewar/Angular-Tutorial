import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UserModel } from '../../auth/auth.model';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AlertService } from '../../shared/alert.service';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [NgFor,NgIf,LoaderComponent,DatePipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
users:UserModel[]=[];
// addSubscriber!:Subscription;
currentPage=1;
itemsPerPage=3;
searchQuery='';
isLoading:boolean=false;
totalPages=0;
constructor(private adminService:AdminService,private alertService:AlertService)
{
}
ngOnInit()
{
  this.getAllUsersData()
}

getAllUsersData()
{
  this.isLoading=true;
  this.adminService.getAllUsers(this.currentPage,this.itemsPerPage,this.searchQuery).subscribe({next:(res:any)=>{
    this.users = res.data;
    this.totalPages = res.pages;
    console.log(res.data);
    
    this.isLoading=false;
  },error:(err:any)=>{
    this.alertService.showError(err.error.message);
    this.isLoading=false;
  }})
}
// get filteredUsers()
// {
//   if(!this.searchQuery)
//     {
//       return this.users;
//     }

//   return this.users.filter((user)=>
//     user.firstname.toLowerCase().includes(this.searchQuery.toLowerCase())|| user.lastname.toLowerCase().includes(this.searchQuery.toLowerCase())
//   )
// }
// get paginatedUsers()
// {
//   const start = (this.currentPage-1)*this.itemsPerPage;
//   const end = start + this.itemsPerPage;
//   return this.filteredUsers.slice(start,end)
// }

// get totalUserPages()
// {
//   return Math.ceil(this.filteredUsers.length/this.itemsPerPage);
// }
previousPage()
{
  if(this.currentPage>1)
    {
      this.currentPage--;
      this.getAllUsersData();
    }
}
nextPage()
{
  if(this.currentPage<this.totalPages)
    {
      this.currentPage++;
      this.getAllUsersData();
    }
}

onChangeSearch(event:Event)
{
  this.searchQuery = (event.target as HTMLInputElement).value;
  this.currentPage=1;
  this.getAllUsersData()
}

deleteUser(id:any)
{
  this.adminService.deleteUser(id).subscribe({next:(res:any)=>{
    this.alertService.showSuccess(res.message);   
    this.getAllUsersData(); 
  },error:(err:any)=>{
    this.alertService.showError(err.error.message)
  }})
}
}
