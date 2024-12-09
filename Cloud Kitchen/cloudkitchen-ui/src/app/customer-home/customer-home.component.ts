import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  searchedKey: string;
  searchOutcomes: any;
  errorMessage: string;
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  searchFood = () => {
    this.customerService.seachFood(this.searchedKey).subscribe(
      (data) => { this.searchOutcomes = data; this.errorMessage = null; },
      (error) => { this.searchOutcomes = null; this.errorMessage = 'Sorry! We didn\'t find what you are looking for. Try searching for something else 🍟!!'}
    )
  }

  viewDetails = ( restaurantId ) => {
    this.router.navigate(['view-restaurant-details/' + restaurantId]);
  }

}
