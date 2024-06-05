import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { customincrement } from '../shared/store/counter.actions';
import { FormsModule } from '@angular/forms';
import { CounterModel } from '../shared/store/counter.model';
import { AppStateModel } from '../shared/store/global/AppState.Model';
import { AngularModule } from '../angular.module';

@Component({
  selector: 'app-custom-counter',
  standalone: true,
  imports:[AngularModule,FormsModule],
  templateUrl: './custom-counter.component.html',
  styleUrl: './custom-counter.component.css'
})
export class CustomCounterComponent {
  constructor(private store:Store<AppStateModel>){}
  counterInput!:number;
  actionType='add';
  customIncrement()
  {
    this.store.dispatch(customincrement({value: +this.counterInput,action:this.actionType}))
  }
}
