import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Product[] = [];

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
}
