import { Component } from '@angular/core';
import { AuthorsService } from '../../service/authors.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  cartItems: any[] = [];

  constructor(private cartService: AuthorsService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
  }
}
