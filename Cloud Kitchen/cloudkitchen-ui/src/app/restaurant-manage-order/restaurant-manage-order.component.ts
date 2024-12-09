import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-manage-order',
  templateUrl: './restaurant-manage-order.component.html',
  styleUrls: ['./restaurant-manage-order.component.css']
})
export class RestaurantManageOrderComponent implements OnInit {
  
  successMessage:any
  restaurantOrders:any
  errorMessage:string
  constructor(private service:RestaurantServiceService,private router:Router) { }
   
  ngOnInit(): void {
    
    this.service.restaurantOrders().subscribe(
      success=>{this.restaurantOrders=success
      console.log(this.restaurantOrders)},
      error=>this.errorMessage=error.error.message
    )
  }
  changeStatus(orderId,status){
   
    let detail={
      orderId:orderId,
      status:status
    }
    this.service.changeOrderStatus(orderId,status,detail).subscribe(
      success=>this.successMessage=success.message,
      error=>this.errorMessage=error.error.message
    )
  }

}
