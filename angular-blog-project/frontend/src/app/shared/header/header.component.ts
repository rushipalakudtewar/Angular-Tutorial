import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  section: string | null = null;



  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute,private alertMessage:AlertService){}
  ngOnInit()
  {
    this.route.data.subscribe((data: any) => {
      this.section = data.section;
    });
  }
  onLogout() {
    this.authService.logout().subscribe(
      (res: any) => { // Adjust type as needed
        localStorage.removeItem('token');
      
        this.alertMessage.showSuccess(res.message);
        this.router.navigate(['/auth/login'])
      },
      (err: any) => {
        this.alertMessage.showError(err.error.message)
      }
    );
  }
}
