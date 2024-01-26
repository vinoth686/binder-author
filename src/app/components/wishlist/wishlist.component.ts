import { Component, OnInit } from '@angular/core';
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
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  cartItems: Course[] = [];
  wishlist: any = '';

  constructor(private cartService: AuthorsService, private alertService: AlertService) {}

  ngOnInit() {
    const wishlist = localStorage.getItem('cart');
    this.wishlist = wishlist ? JSON.parse(wishlist) : [];
  }

  delete(i:number) {
      this.wishlist.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(this.wishlist));
  }

  public addToCart(course: any, i:number) {
      this.cartService.addToCart(course);
      this.cartService.getCartItems().subscribe(items => {
        this.cartItems = items;
      });
      this.wishlist.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(this.wishlist));
      this.alertService.showSuccess('Course added to cart successfully!');
  }
}
