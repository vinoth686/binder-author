import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CoursedetailsComponent } from './components/coursedetails/coursedetails.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'coursedetails', component: CoursedetailsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'cartdetails', component: CartDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
