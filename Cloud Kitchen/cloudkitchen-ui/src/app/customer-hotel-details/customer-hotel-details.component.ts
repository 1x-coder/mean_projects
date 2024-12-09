import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-hotel-details',
  templateUrl: './customer-hotel-details.component.html',
  styleUrls: ['./customer-hotel-details.component.css']
})
export class CustomerHotelDetailsComponent implements OnInit {

  restaurantDetails: any;
  restaurantId: string;
  searchKeyword: string;
  foodIds: Array<string> = [];
  foodDetails: Array<any> = [];
  vegOnly: boolean = false;
  isLoggedIn: boolean = false;
  orderingCart: Array<any> = [];
  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    if ( sessionStorage.getItem('current_user') ) {
        this.isLoggedIn = true;
    }

    this.activatedRoute.params.subscribe(
      (params) => {this.restaurantId = params.restaurant_id; }
    );

    this.customerService.getRestaurantDetails(this.restaurantId).subscribe(
      (details) => { this.restaurantDetails = details;
                     for (const id of details.menu.starter){
                       this.foodIds.push(id);
                    }
                     for (const id of details.menu.mainCourse){
                      this.foodIds.push(id);
                    }
                     for (const id of details.menu.dessert){
                      this.foodIds.push(id);
                    }
                     for (const id of details.menu.juice){
                      this.foodIds.push(id);
                    }
                     for (const fid of this.foodIds){
                      this.customerService.getFoodDetails(fid).subscribe(
                        (data) => this.foodDetails.push(data)
                      );
    }

      }
    );


  }

  goHome = () => {
    this.router.navigate(['']);
  }

  addToCart = ( foodItem ) => {
      this.orderingCart.push(foodItem);
  }

  foodSearch = () => {
    let foodArray = this.foodDetails;
    if ( this.searchKeyword ){
        foodArray = foodArray.filter(x => x.name.toLowerCase().includes(this.searchKeyword.toLowerCase()));
    }
    this.foodDetails = foodArray;
  }

  displayVeg = () =>{
    if (this.vegOnly){
      this.vegOnly = false;
    }else{
      this.vegOnly = true;
    }
  }

  viewOrderingCart = () => {
    this.customerService.sendOrderedFood(this.orderingCart);
    this.router.navigate(['/view-cart']);
  }

}
