import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgFor,DatePipe, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { BlogListModel } from '../../blog/blog.model';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-update-blogs',
  standalone: true,
  imports: [NgFor,DatePipe,LoaderComponent,NgIf],
  templateUrl: './update-blogs.component.html',
  styleUrl: './update-blogs.component.css'
})
export class UpdateBlogsComponent implements OnInit,OnDestroy{
  blogs:BlogListModel[]=[];
  isLoading:boolean=false;
  addSubscriber!:Subscription;
  currentPage=1;
  itemsPerPage=5;
  searchQuery='';
  totalPages=0;
  constructor(private adminService:AdminService,private alertService:AlertService){}

  ngOnInit()
  {
    this.addSubscriber = this.getAllBlogData();
  }

  getAllBlogData()
  {
    this.isLoading=true;
    return this.adminService.getAllBlogs(this.currentPage,this.itemsPerPage,this.searchQuery).subscribe({next:(res:any)=>{
      this.blogs = res.blogs;
      this.totalPages = res.pages;
      this.isLoading=false;
    },error:(err:any)=>{
      this.alertService.showError(err.error.message)
    }})
  }
  // get filterBlogs()
  // {
  //   if(!this.searchQuery)
  //     {
  //       return this.blogs;
  //     }
  //   return this.blogs.filter(blog=>
  //     blog.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   )
  // }
  // get paginatedBlogs(){
  //   const start = (this.currentPage-1)*this.itemsPerPage; 
  //   const end = start+ this.itemsPerPage;
  //   return this.filterBlogs.slice(start,end)
  // }
  // get totalPages()
  // {
  //   return Math.ceil(this.filterBlogs.length/this.itemsPerPage)
  // }
  previousPage()
  {
    if(this.currentPage>1)
      {
        this.currentPage--;
        this.getAllBlogData();
      }
  }
  nextPage()
  {
    if(this.currentPage<this.totalPages)
      {
        this.currentPage++;
        this.getAllBlogData();
      }
  }
  deleteblog(id:any)
  {
    this.adminService.deleteBlog(id).subscribe({next:(res:any)=>{
      this.alertService.showSuccess(res.message)
      this.getAllBlogData();
      
    },error:(err)=>{
      this.alertService.showError(err.error.message);      
    }})
  }

  togglePublish(blog:any)
  {
    const updatedStatus = !blog.publish;
    this.adminService.publishStatus(blog._id,updatedStatus).subscribe({next:(res:any)=>{
      this.getAllBlogData()
      this.alertService.showSuccess(res.message);
    },error:(err:any)=>{
      this.alertService.showError(err.error.message)
      
    }})
    
  }
  onChangeSearch(event:Event)
  {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage=1;
    this.getAllBlogData();
  }
  ngOnDestroy()
  {
    if(this.addSubscriber)
      {
        this.addSubscriber.unsubscribe()
      }
  }

}
