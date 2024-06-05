import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../../models/product.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css'
})
export class ProductCardsComponent {
  @Input() product!:IProducts;
  @Output() handleAdd = new EventEmitter();
  showFullDescription=false;

  addToCart(product:IProducts)
  {
    console.log(product);
    
    this.handleAdd.emit(product)
  }
  removeFromCart()
  {

  }
}
