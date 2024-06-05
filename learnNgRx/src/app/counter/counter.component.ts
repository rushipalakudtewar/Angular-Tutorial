import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { changename, decrement, increment, reset } from '../shared/store/counter.actions';
import {MatButtonModule} from '@angular/material/button';
import { CounterModel } from '../shared/store/counter.model';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { getCounter } from '../shared/store/counter.selector';
import { CustomCounterComponent } from '../custom-counter/custom-counter.component';
import { AppStateModel } from '../shared/store/global/AppState.Model';
import { AngularModule } from '../angular.module';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AngularModule,AsyncPipe,CustomCounterComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counter!:number;
  channelname='';
  counterSubscribe!:Subscription;
  counter$!:Observable<CounterModel>
  constructor(private store:Store<AppStateModel>){
    
  }
  ngOnInit()
  {
    this.counterSubscribe = this.store.select('counter').subscribe(data=>{
      this.counter=data.counter;
      this.channelname=data.channelname
    })

    // with using we can directly get one data at a time using selector
    // this.counterSubscribe = this.store.select(getCounter).subscribe(data=>{
    //   this.counter=data;
    //   // this.channelname=data.channelname
    // })
    
    //without subscribing we directly use
    // this.counter$ = this.store.select('counter')
  }
  increment()
  {
    this.store.dispatch(increment())
  }
  decrement()
  {
    if(this.counter>0)
      {
        this.store.dispatch(decrement())
      }
  }
  reset()
  {
    this.store.dispatch(reset())
  }
  changeName()
  {
      this.store.dispatch(changename({name:'Rushi IT Company'}))
  }
  ngOnDestroy()
  {
    if(this.counterSubscribe)
      {
        this.counterSubscribe.unsubscribe();
      }
  }
}
