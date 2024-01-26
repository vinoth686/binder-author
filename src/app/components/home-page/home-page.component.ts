import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthorsService } from '../../service/authors.service';
import { AlertService } from '../../alert.service';

interface Course {
  courseName: string;
  author: string;
  actualPrice: string;
  discountPercentage: string;
  tags: string[];
  addedToCart?: boolean
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent {
  
  searchText: string = '';
  cartItems: Course[] = [];
  sortBy: string = '';
  courses: Course[] = [
    {
      "courseName": "Advanced Machine Learning",
      "author": "Alex Johnson",
      "actualPrice": "₹1199",
      "discountPercentage": "15%",
      "tags": ["Machine Learning", "Python"]
    },
    {
      "courseName": "JavaScript Frameworks Masterclass",
      "author": "Emily White",
      "actualPrice": "₹899",
      "discountPercentage": "20%",
      "tags": ["JavaScript", "React", "Vue"]
    },
    {
      "courseName": "Full Stack Development with Django",
      "author": "Chris Turner",
      "actualPrice": "₹1499",
      "discountPercentage": "10%",
      "tags": ["Python", "Django", "JavaScript"]
    },
    {
      "courseName": "Cybersecurity Essentials",
      "author": "Sophia Davis",
      "actualPrice": "₹1299",
      "discountPercentage": "25%",
      "tags": ["Cybersecurity", "Network Security"]
    },
    {
      "courseName": "Mobile App UX Design",
      "author": "Daniel Smith",
      "actualPrice": "₹999",
      "discountPercentage": "18%",
      "tags": ["UX Design", "Mobile App Development"]
    },
    {
      "courseName": "Node.js for Beginners",
      "author": "Ava Williams",
      "actualPrice": "₹699",
      "discountPercentage": "22%",
      "tags": ["Node.js", "JavaScript"]
    },
    {
      "courseName": "Artificial Intelligence in Business",
      "author": "Noah Turner",
      "actualPrice": "₹1599",
      "discountPercentage": "12%",
      "tags": ["Artificial Intelligence", "Business"]
    },
    {
      "courseName": "Swift Programming for iOS",
      "author": "Emma Johnson",
      "actualPrice": "₹1099",
      "discountPercentage": "17%",
      "tags": ["iOS", "Swift"]
    },
    {
      "courseName": "Responsive Web Design Principles",
      "author": "Liam White",
      "actualPrice": "₹799",
      "discountPercentage": "21%",
      "tags": ["Web Design", "HTML", "CSS"]
    },
    {
      "courseName": "Java Fundamentals",
      "author": "Olivia Turner",
      "actualPrice": "₹899",
      "discountPercentage": "0",
      "tags": ["Java"]
    },
    {
      "courseName": "Game Development with Unity",
      "author": "Lucas Davis",
      "actualPrice": "₹1399",
      "discountPercentage": "14%",
      "tags": ["Game Development", "Unity"]
    },
    {
      "courseName": "Python for Data Science",
      "author": "Aria Smith",
      "actualPrice": "₹1199",
      "discountPercentage": "0",
      "tags": ["Python", "Data Science"]
    },
    {
      "courseName": "Frontend Development Bootcamp",
      "author": "Mia Johnson",
      "actualPrice": "₹999",
      "discountPercentage": "18%",
      "tags": ["HTML", "CSS", "JavaScript"]
    },
    {
      "courseName": "C# Programming Mastery",
      "author": "Jackson White",
      "actualPrice": "₹1099",
      "discountPercentage": "0",
      "tags": ["C#"]
    },
    {
      "courseName": "Angular Framework Deep Dive",
      "author": "Ava Turner",
      "actualPrice": "₹1299",
      "discountPercentage": "15%",
      "tags": ["Angular"]
    },
    {
      "courseName": "Data Visualization with D3.js",
      "author": "Ethan Davis",
      "actualPrice": "₹899",
      "discountPercentage": "0",
      "tags": ["Data Visualization", "D3.js"]
    },
    {
      "courseName": "Android App Development Basics",
      "author": "Isabella Smith",
      "actualPrice": "₹799",
      "discountPercentage": "0",
      "tags": ["Android", "Mobile App Development"]
    },
    {
      "courseName": "Vue.js for Frontend Development",
      "author": "Logan Johnson",
      "actualPrice": "₹999",
      "discountPercentage": "18%",
      "tags": ["Vue.js", "JavaScript"]
    },
    {
      "courseName": "Cloud Computing Fundamentals",
      "author": "Sophie Turner",
      "actualPrice": "₹1199",
      "discountPercentage": "16%",
      "tags": ["Cloud Computing"]
    }
  ]
  p: number = 1;
  test: boolean = false;
  isAddedToCart: boolean = false;
  addedToCart: boolean = false;
  constructor(private router: Router, private cartService: AuthorsService, private alertService: AlertService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItemsFromStorage();
  }
  
  get filteredCourses(): Course[] {
    const filtered = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.author.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  
    return this.sortCourses(filtered);
  }

  public isCourseAddedToCart(course: Course): boolean {
    return this.cartItems.some(item => item.courseName === course.courseName);
  }

  sortCourses(courses: Course[]): Course[] {
    if (this.sortBy === 'lowToHigh') {
      return courses.sort((a, b) => this.comparePrices(a.actualPrice, b.actualPrice));
    } else if (this.sortBy === 'highToLow') {
      return courses.sort((a, b) => this.comparePrices(b.actualPrice, a.actualPrice));
    } else {
      return courses;
    }
  }

  comparePrices(priceA: string, priceB: string): number {
    const priceNumA = parseInt(priceA.slice(1), 10);
    const priceNumB = parseInt(priceB.slice(1), 10);
  
    return priceNumA - priceNumB;
  }

public addToCart(event: Event, course: Course) {
  if (this.isCourseInCart(course)) {
    this.alertService.showWarning('Course already added to cart!');
  } else {
    this.cartService.addToCart(course);
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
    course.addedToCart = true;
    this.alertService.showSuccess('Course added to cart successfully!');
  }
  event.stopPropagation();
}

public gotToWishList(event: Event, course: Course) {
let existingCart = localStorage.getItem('cart');

  if (!existingCart) {
    existingCart = '[]';
  }

  const cartArray = JSON.parse(existingCart);

  cartArray.push(course);

  localStorage.setItem('cart', JSON.stringify(cartArray));
  event.stopPropagation();
}

private isCourseInCart(course: Course): boolean {
  return this.cartItems.some(item => item.courseName === course.courseName);
}

public goToDetails(course: Course) {
  this.router.navigate(['coursedetails'], {state: {someData: course}});
}
}
