import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  public navigatetoHomePage() : void  {
    this.router.navigate(['/home'])
  }

  public navigatetoWishList(): void {
    this.router.navigate(['wishlist'])
  }

  public navigateToProfile(): void {
    this.router.navigate(['profile'])
  }

  public navigateToCartDetail(): void {
    this.router.navigate(['cartdetails'])
    this.cdr.detectChanges();
  }
}
