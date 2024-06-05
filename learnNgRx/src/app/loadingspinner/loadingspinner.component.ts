import { Component } from '@angular/core';
import { AngularModule } from '../angular.module';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { getSpinnerState } from '../shared/store/blog/blog.selector';

@Component({
  selector: 'app-loadingspinner',
  standalone: true,
  imports: [AngularModule,NgIf],
  templateUrl: './loadingspinner.component.html',
  styleUrl: './loadingspinner.component.css'
})
export class LoadingspinnerComponent {
  isloading=false;
  constructor(private store:Store){}
  ngOnInit()
  {
    this.store.select(getSpinnerState).subscribe((res)=>{
      this.isloading=res;
    }) 
  }
}
