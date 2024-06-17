import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { BlogUpdateuserModelComponent } from '../blog-updateuser-model/blog-updateuser-model.component';
import { UserModel } from '../../auth/auth.model';
import { NgIf } from '@angular/common';
import { AlertService } from '../../shared/alert.service';
import { LoaderComponent } from '../../shared/loader/loader.component';




@Component({
  selector: 'app-blog-userdetails',
  standalone: true,
  imports: [HeaderComponent,BlogUpdateuserModelComponent,NgIf,LoaderComponent],
  templateUrl: './blog-userdetails.component.html',
  styleUrl: './blog-userdetails.component.css'
})
export class BlogUserdetailsComponent implements OnInit{
  userDetails?:UserModel;
  isLoading:boolean=false;
  constructor(private authService:AuthService,private alertService:AlertService){}

  ngOnInit()
  {
    this.getUser();
  }
  get avatarUrl(): string {
    const seed = `${this.userDetails?.firstname} ${this.userDetails?.lastname}`;

    
    return `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(seed)}`;
  }
  getUser()
  {
    this.isLoading=true;
    this.authService.getUser().subscribe({next:(res:any)=>{
      this.userDetails = res.user;
      this.isLoading=false;
    },error:(err:any)=>{
      this.isLoading=false;
      this.alertService.showError(err.error.message);
    }
  })
  }
  triggerFileInput()
  {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click()
  }
  onFileSelected(event:Event)
  {
    const input =event.target as HTMLInputElement;
    if(input.files && input.files.length>0)
      {
        const file= input.files[0];
        this.uploadProfileImage(file);
      }
  }
  uploadProfileImage(file:File)
  {
    const formData = new FormData();
    formData.append('profileimage',file);
    this.authService.updateProfilePicture(formData).subscribe({next: (res: any) => {
        console.log(res);
        this.getUser()
        this.alertService.showSuccess(res.message);
      },
      error: (err: any) => {
        this.alertService.showError(err.error.message);
      }
    }
  )
  }
}
