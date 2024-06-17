import { Component, OnDestroy, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { Chart } from 'chart.js';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { AuthService } from '../../auth/services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  title = 'my-chart-app';
  addsubscribe!:Subscription;
  blogs:number=0;
  users:number=0;
  constructor(private adminService:AdminService,private alertService:AlertService)
  {}
  ngOnInit() {
    this.addsubscribe = this.adminService.getCountValue().subscribe({next:(res:any)=>{
      this.blogs = res.blogsCount;
      this.users = res.usersCount
      this.createPieChart();
    },error:(err:any)=>{
      this.alertService.showError(err.error.message);
    }})   
    
  }

  createPieChart() {
    const options = {
      series: [this.users, this.blogs],
      labels: ['Users', 'Blogs'],
      chart: {
        type: 'pie',
        height: 400
      },
      title: {
        text: 'Users and Blogs Distribution',
        align: 'center',
        margin: 10,
        offsetY: 20,
        style: {
          fontSize: '18px',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetY: 5,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          }
        }
      }]
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  ngOnDestroy()
  {
    if(this.addsubscribe)
      {

        this.addsubscribe.unsubscribe()
      }
  }
}
