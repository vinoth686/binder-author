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
  cartItems: any;
  totalDiscountedPrice: number = 0;
  totalDiscountedDifference: number = 0;
  constructor(private cartService: AuthorsService, private alertService: AlertService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log(this.cartItems);
    });

  }

  calculateDiscountedPrice(actualPrice: string, discountPercentage: string): string {
    const price = parseFloat(actualPrice.replace('₹', '').replace(',', ''));
    const discount = parseFloat(discountPercentage);

    if (!isNaN(price) && !isNaN(discount)) {
      // if (discount > 0) {
        const discountedPrice = price - (price * discount / 100);
        const difference = price - discountedPrice;
        this.totalDiscountedDifference += difference;

        this.totalDiscountedPrice += discountedPrice;

        return '₹' + discountedPrice.toFixed(2).toString();
      // }
    }

    return '';
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
