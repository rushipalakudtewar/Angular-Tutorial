import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from './states/counter/counter.selector';
import { AppState } from './states/app.state';
import { AsyncPipe } from '@angular/common';
import { IProducts } from './models/product.interface';
import { selectCartProducts } from './states/cart/cart.selector';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AsyncPipe,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngRx-realPractice';
  count$:Observable<number>;
  // products$:Observable<IProducts>;
  constructor(private store:Store<AppState>) {
    this.count$ = this.store.select(selectCount);
    // this.products$ = this.store.select(selectCartProducts)
  }

}
