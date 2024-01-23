import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CoursedetailsComponent } from './components/coursedetails/coursedetails.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent },
  // { path: 'header', component: HeaderComponent}

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to '/home'
  { path: 'home', component: HomePageComponent },
  { path: 'header', component: HeaderComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'coursedetails', component: CoursedetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
