import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { BlogListModel } from '../blog/blog.model';
import { LoaderComponent } from '../shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../shared/alert.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoaderComponent,CommonModule,HeaderComponent,FooterComponent,FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentPage=1;
  itemPerPage=5;
  publishedBlogs:BlogListModel[]=[];
  isLoading:boolean=false;
  searchQuery='';
  totalPages=0;
  constructor(private dashboardService:DashboardService,private alertService:AlertService){}

  ngOnInit()
  {
    this.getAllThePublishedBlogs()
  }
  getAllThePublishedBlogs()
  {
    this.isLoading=true;
    this.dashboardService.getAllPublishedBlogs(this.currentPage,this.itemPerPage,this.searchQuery).subscribe({next:(res:any)=>{
      this.publishedBlogs = res.publishedBlogs;
      // alert(res.message);
      this.totalPages = res.totalPage;
      this.isLoading=false;
    },error:(err:any)=>{
      // alert(err.error.message);
      this.alertService.showError(err.error.message);
      this.isLoading=false
    }})
  }
  // get filteredBlogs()
  // {   
    
  //   if(!this.searchQuery)
  //     {
  //       return this.publishedBlogs;
  //     }
      
  //     return this.publishedBlogs.filter(blog=>
  //       blog.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     )
  // }
  // get PaginatedBlogs()
  // {
  //   const start = (this.currentPage-1)*this.itemPerPage;
  //   const end = start + this.itemPerPage;
  //   return this.publishedBlogs.slice(start,end);
  // }

  // get totalPages()
  // {
  //   return Math.ceil(this.publishedBlogs.length/this.itemPerPage)
  // }
  goToPage(page:number)
  {
    this.currentPage = page;
    this.getAllThePublishedBlogs()
  }
  previousPage()
  {
    if(this.currentPage>1)
      {
        this.currentPage--;
        this.getAllThePublishedBlogs();
      }
  }
  nextPage()
  {
    if(this.currentPage<this.totalPages)
      {
        this.currentPage++;
        this.getAllThePublishedBlogs();
      }
  }
  onSearchChange(event:Event)
  {
    this.searchQuery =  (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.getAllThePublishedBlogs();
  }
  // searchBlog()
  // {
  //  console.log(this.searchQuery);
    
  // }
}
