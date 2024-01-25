import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private cartItemsSubject = new BehaviorSubject<Course[]>([]);
  constructor() {
    const storedItems = localStorage.getItem('wishlist');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(item: any) {
    console.log(item)
    this.cartItems.push(item);
    // this.cartItems.splice(0, this.cartItems.length);
    this.cartItemsSubject.next(this.cartItems);
    localStorage.setItem('wishlist', JSON.stringify(this.cartItems));
    // this.messageSource.next(item);
  }

  getCartItems() {
    // return this.cartItems;
    return this.cartItemsSubject.asObservable();
  }
}