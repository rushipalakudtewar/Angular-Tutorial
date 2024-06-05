import { Component } from '@angular/core';
import { selectCartProducts } from '../states/cart/cart.selector';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems$ = this.store.select(selectCartProducts)
  constructor(private store:Store<AppState>){
    console.log(this.cartItems$);
    
  }
}
