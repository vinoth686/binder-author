import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../service/authors.service';
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

  constructor(private cartService: AuthorsService) {}

  ngOnInit() {
    // this.cartItems = this.cartService.getCartItems();
    // console.log(this.cartItems);
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log(this.cartItems);
    });
  }
}
