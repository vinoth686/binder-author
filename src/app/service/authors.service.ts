import { Injectable } from '@angular/core';
interface Course {
    courseName: string;
    author: string;
    actualPrice: string;
    discountPercentage: string;
    tags: string[];
  }
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private cartItems: Course[] = [];

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  getCartItems() {
    return this.cartItems;
  }
}