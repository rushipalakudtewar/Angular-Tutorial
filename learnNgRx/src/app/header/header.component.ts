import { Component } from '@angular/core';
import { AngularModule } from '../angular.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router)
  {

  }
  onCounter() 
  {
    this.router.navigate(['/counter']);
  }
  onBlog()
  {
    this.router.navigate(['/blog'])
  }
}
