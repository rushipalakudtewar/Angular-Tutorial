import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm!:FormGroup;
  constructor(private authService:AuthService,private router:Router,private alertService:AlertService){}
  ngOnInit() {
      this.signupForm = new FormGroup({
        'firstname':new FormControl(null,Validators.required),
        'lastname':new FormControl(null,Validators.required),
        'email':new FormControl(null,[Validators.required,Validators.email]),
        'password':new FormControl(null,[Validators.required,Validators.minLength(5)])
      })
  }
  onRegister()
  {
    this.authService.register(this.signupForm.value).subscribe({next:(res:any)=>{
      this.router.navigate(['/auth/login'])
      this.alertService.showSuccess(res.message);
    },error:(err:any)=>{  
      this.alertService.showError(err.error.message);
    }})
  }
}
