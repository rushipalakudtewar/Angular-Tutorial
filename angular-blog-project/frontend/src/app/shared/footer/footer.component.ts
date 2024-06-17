import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  section: string | null = null;
  constructor(private route:ActivatedRoute){}
  ngOnInit()
  {
    this.route.data.subscribe((data: any) => {
      this.section = data.section;
    });
    
    
    
  }
}
