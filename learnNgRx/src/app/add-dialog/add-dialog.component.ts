import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule } from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input';
import { AngularModule } from '../angular.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogModel } from '../shared/store/blog/blog.model';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../shared/store/global/AppState.Model';
import { addblog, updateblog } from '../shared/store/blog/blog.actions';
import { getBlogById } from '../shared/store/blog/blog.selector';
@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [AngularModule,ReactiveFormsModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent implements OnInit{
  pagetitle='';
  editblogid=0;
  editData!:BlogModel;
  constructor(private dialogref:MatDialogRef<AddDialogComponent>,private builder:FormBuilder,
    private store:Store<AppStateModel>,@Inject(MAT_DIALOG_DATA) public data:any
  ){

  }
  ngOnInit(): void {
    console.log(this.data);
    this.pagetitle = this.data.title;
    if(this.data.isedit){
      this.editblogid = this.data.id;
      this.store.select(getBlogById(this.editblogid)).subscribe((data)=>{
        this.editData=data;
        this.blogform.setValue({id:this.editData.id,title:this.editData.title,description:this.editData.description})
      })
    }

    
  }
  closePopup()
  {
    this.dialogref.close()
  }
  blogform= this.builder.group({
    id:this.builder.control(0),
    title:this.builder.control('',Validators.required),
    description:this.builder.control('',Validators.required)
  })
  saveBlogs()
  {
    if(this.blogform.valid)
      {
        const _bloginput:BlogModel={
          id:0,
          title:this.blogform.value.title as string,
          description:this.blogform.value.description as string
        }
        if(this.data.isedit)
          {
            _bloginput.id = this.blogform.value.id as number;
            this.store.dispatch(updateblog({bloginput:_bloginput}))
          }
          else
          {
            this.store.dispatch(addblog({bloginput:_bloginput}));
          }
        this.closePopup();
  }

  }
}
