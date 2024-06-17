import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,HttpClientModule,HeaderComponent,FooterComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isAuthenticated: boolean = false;
  constructor(private router: Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let section = null;
      if (event.url.startsWith('/blog')) {
        section = 'blog';
      } else if (event.url.startsWith('/admin')) {
        section = 'admin';
      }
      this.activatedRoute.firstChild?.data.subscribe((data: any) => {
        data.section = section;
      });
    });
    this.isAuthenticated=true
  }

}
