import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardsComponent } from '../shared/components/product-cards/product-cards.component';
import { IProducts } from '../models/product.interface';
import { ProductApiService } from '../shared/services/product-api.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../states/cart/cart.action';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardsComponent,AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  http = inject(HttpClient);
  productApi = inject(ProductApiService)
  products$=this.productApi.getProducts() as Observable<IProducts[]>;
  constructor(private store:Store<{cart:{products:IProducts[]}}>){

  }
  ngOnInit()
  {
    // this.productApi.getProducts().subscribe((res)=>{
    //   console.log(res);
      
    // })
  }
  addItemToCart(product:IProducts)
  {
    this.store.dispatch(addToCart({product}))
  }

}
