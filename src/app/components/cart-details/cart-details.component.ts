import { Component } from '@angular/core';
import { AuthorsService } from '../../service/authors.service';
import { AlertService } from '../../alert.service';
interface Course {
  courseName: string;
  author: string;
  actualPrice: string;
  discountPercentage: string;
  tags: string[];
}
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {
  cartItems: any = [];

  totalDiscountedSum: number = 0; 
  totalDifferenceSum: number = 0; 
  
  constructor(private cartService: AuthorsService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.cartItems.forEach((item: Course) => {
        const discountedPrice = this.calculateDiscountedPrice(item.actualPrice, item.discountPercentage);
        const actualPrice = parseFloat(item.actualPrice.replace('₹', '').replace(',', ''));
        const discountedValue = parseFloat(discountedPrice.replace('₹', ''));
        const difference = actualPrice - discountedValue;
        this.totalDifferenceSum += difference;
        this.totalDiscountedSum += discountedValue;
      });
    });
  }

  calculateDiscountedPrice(actualPrice: string, discountPercentage: string): string {
    const price = parseFloat(actualPrice.replace('₹', '').replace(',', ''));
    const discount = parseFloat(discountPercentage.replace('%', ''));

    const discountedPrice = price - (price * (discount / 100));
    return `₹${discountedPrice.toFixed(2)}`;
  }

  checkout() {
    this.alertService.showSuccess('Course added to cart successfully!');
    localStorage.removeItem('wishlist');
    location.reload();
  }

  delete(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(this.cartItems));
  }

  moveToWishlist(course: any, i: number) {
    let existingCart = localStorage.getItem('cart');
  if (!existingCart) {
    existingCart = '[]';
  }
  const cartArray = JSON.parse(existingCart);
  cartArray.push(course);
  localStorage.setItem('cart', JSON.stringify(cartArray));
    this.cartItems.splice(i, 1);
    localStorage.setItem('wishlist', JSON.stringify(this.cartItems));
  }
}
