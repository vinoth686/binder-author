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
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
    this.updateCartItemsInStorage(); 
  }

  getCartItemsFromStorage(): Course[] {
    const storedItems = localStorage.getItem('wishlist');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  
  updateCartItemsInStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }
}