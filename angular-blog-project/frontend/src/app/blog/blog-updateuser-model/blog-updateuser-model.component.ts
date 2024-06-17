import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UserModel } from '../../auth/auth.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { BlogUserdetailsComponent } from '../blog-userdetails/blog-userdetails.component';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-blog-updateuser-model',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './blog-updateuser-model.component.html',
  styleUrl: './blog-updateuser-model.component.css'
})
export class BlogUpdateuserModelComponent {
  @Input() userDetails: any = {};
  updateUserData!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private blogUser:BlogUserdetailsComponent,private alertService:AlertService) {
    this.updateUserData = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]], // Fixed here
      'gender': ['', Validators.required],
      'address': ['', Validators.required],
      'state': ['', Validators.required],
      'city': ['', Validators.required],
      'pincode': ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChange) {
    if ('userDetails' in changes) {
      this.updateUserData.patchValue({
        'firstname': this.userDetails?.firstname,
        'lastname': this.userDetails?.lastname,
        'email': this.userDetails?.email,
        'address':this.userDetails?.address,
        'state':this.userDetails?.state,
        'city':this.userDetails?.city,
        'gender':this.userDetails?.gender,
        'pincode':this.userDetails?.pincode
      });
    }
  } 
  onUpdateUser()
  {
    if(this.updateUserData.valid)
      {
        this.authService.updateUserDetails(this.updateUserData.value).subscribe({next:(res:any)=>{
          this.alertService.showSuccess(res.message);
          this.blogUser.getUser();
        },error:(err:any) =>{
          this.alertService.showError(err.error.message)
        }})
        
      }
  }
}
