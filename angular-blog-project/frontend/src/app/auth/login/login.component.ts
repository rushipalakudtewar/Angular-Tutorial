import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(private authService:AuthService,private router:Router,private alertService:AlertService){}
  ngOnInit() {
      this.loginForm = new FormGroup({
        'email':new FormControl(null,[Validators.required,Validators.email]),
        'password':new FormControl(null,[Validators.required,Validators.minLength(5)])
      })
  }
  onLogin()
  {
    this.authService.login(this.loginForm.value).subscribe({next:(res:any)=>{
      localStorage.setItem('token',res.token);
      if(res.user.role==='user')
        {
          this.router.navigate(['/blog'])
        }
        else
        {
          this.router.navigate(['/admin'])
        }
        this.alertService.showSuccess(res.message)
    },error:(err:any)=>{
      this.alertService.showError(err.error.message)
    }}
  )
  }
}
