import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../service/authors.service';
import { Router } from '@angular/router';
interface Course {
  courseName: string;
  author: string;
  actualPrice: string;
  discountPercentage: string;
  tags: string[];
}
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.scss'
})
export class CoursedetailsComponent implements OnInit{
  selectedCourse: any;
  discountPercentageAsNumber: number = 0;
  constructor(private cartService: AuthorsService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCourse = history.state.someData;
    const thresholdPercentage = "10%";
    this.discountPercentageAsNumber = parseFloat(this.selectedCourse.discountPercentage.replace("%", ""));
  }

  calculateDiscountedPrice(actualPrice: string, discountPercentage: number): string {
    const price = parseFloat(actualPrice.replace("₹", ""));
    const discountedPrice = price - (price * (discountPercentage / 100));
    return `₹${discountedPrice.toFixed(2)}`;
  }

  calculateOfferEnd(): string {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999); 

    const timeLeft = endOfDay.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft} hours and ${minutesLeft} minutes`;
  }

  goToDashboard() {
    this.router.navigate(['/'])
  }
}
