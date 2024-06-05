import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from '../shared/store/blog/blog.model';
import { getBlog, getBlogInfo } from '../shared/store/blog/blog.selector';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { deleteblog, loadSpinner, loadblog } from '../shared/store/blog/blog.actions';
import { AngularModule } from '../angular.module';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor,NgIf,AngularModule,AddDialogComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  blogTitle='Blog Website';
  constructor(private store:Store<{blog:BlogModel[]}>,private dialog:MatDialog){

  }
  blogList!:BlogModel[];
  blogInfo!:Blogs;
  ngOnInit()
  {
    this.store.dispatch(loadSpinner({isloader:true}));
    setTimeout(()=>{
      this.store.dispatch(loadblog());
      this.store.dispatch(loadSpinner({isloader:false}));     
    },1000)
    this.store.select(getBlogInfo).subscribe((item)=>{
      console.log(item);
      this.blogInfo=item;    
    })
  }
  addBlog()
  {
    this.onOpenPopup(0,'add-edit')
  }
  onOpenPopup(id:any,title:any,isedit=false)
  {
    this.dialog.open(AddDialogComponent,{
      width:'50%',
      data:{
        id:id,
        title:title,
        isedit:isedit
      }
    })
  }
  editBlog(id:number)
  {
    console.log(id);
    this.onOpenPopup(id,'edit-blog',true)
  }
  deleteBlog(id:number)
  {
    if(confirm("Are you want to remove blog?"))
      this.store.dispatch(loadSpinner({isloader:true}))
      setTimeout(()=>{
        this.store.dispatch(deleteblog({blogid:id}));

      },2000)
    }
}
