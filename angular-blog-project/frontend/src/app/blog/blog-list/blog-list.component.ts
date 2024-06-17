import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { BlogService } from '../services/blog.service';
import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { BlogListModel } from '../blog.model';
import { AlertService } from '../../shared/alert.service';


@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [NgFor,HeaderComponent,CreateBlogComponent,NgClass,NgStyle,DatePipe,NgIf,LoaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit{
  allBlogs:BlogListModel[]=[];
  openModel:Boolean=false;
  currentPage=1;
  itemsPerPage=5;
  selectedBlog:any;
  isLoading:Boolean=false;
  searchQuery='';
  totalPages=0;
  constructor( private authService:AuthService,private blogService:BlogService,private alertService:AlertService)
  {

  }
  ngOnInit()
  {
    this.getBlogs()
  }
  getBlogs()
  {
    this.isLoading=true;
    this.blogService.getAllBlogs(this.currentPage,this.itemsPerPage,this.searchQuery).subscribe({next:(res:any)=>{
      this.allBlogs = res.blogs;
      this.totalPages=res.pages;
      this.isLoading=false
    },error:(err:any)=>{
      this.alertService.showError(err.error.message);
      this.isLoading=false;
      
    }})
  }

  updateBlog(id:number)
  {

     this.selectedBlog = this.allBlogs.find(blog => blog._id === id);
    
    // this.createBlog.updateBlogData(selectedBlog);
    // this.selectedBlogId = id;
    // this.updateBlogForm.patchValue({
    //   title: selectedBlog.title,
    //   content: selectedBlog.content,
    //   tags: selectedBlog.tags.join(', ')z
    // });
    // this.blogService.updateBlog(id,data).subscribe((res:any)=>{
    //   console.log(res);
    //   alert(res.message)
      
    // },(err:any)=>{
    //   console.log(err.error.message);
    //   alert(err.error.message);
      
    // })
  }

  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe({
      next:(res: any) => {
        this.alertService.showSuccess(res.message);
        this.allBlogs = this.allBlogs.filter(blog => blog._id !== id);
      },
      error:(err: any) => {
        this.alertService.showError(err.error.message);
      }}
    );
  }
  nullselectz(){
    this.selectedBlog = null;
  }
  onChangeSearch(event:Event)
  {
    this.searchQuery =(event.target as HTMLInputElement).value;
    console.log(this.searchQuery);
     this.currentPage=1;
     this.getBlogs()
    
  }
  previousPage()
  {
    if(this.currentPage>1)
      {
        this.currentPage--;
        this.getBlogs()
      }
  }
  nextPage()
  {
    if(this.currentPage<this.totalPages)
      {
        this.currentPage++;
        this.getBlogs()
      }
  } 
}
