import { Component, OnInit } from '@angular/core';
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';

@Component({
  selector: 'app-delivery-person-view-orders',
  templateUrl: './delivery-person-view-orders.component.html',
  styleUrls: ['./delivery-person-view-orders.component.css']
})
export class DeliveryPersonViewOrdersComponent implements OnInit {
  public orders: Array<any>;
  public errorMessage: string;
  public loading: boolean = false;
  public foodData: Array<any> =[];

  constructor(private serv: DeliveryPersonServiceService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.serv.getOrders().subscribe(
      (success) => {
        this.loading = false;
        this.orders = success.orders;
        for(let order of this.orders) {
          this.foodData = []
          for (let food of success.foodData) {
            for(let fid of order.food) {
              if (food.foodId == fid) {
                this.foodData.push(food.name)
              }
            }
          }
          order.food = this.foodData
        }
        for(let order of this.orders) {
          for (let cust of success.custData) {
            if(order.customer == cust.customerId) {
              order.customer = cust
            }
          }
        }
        for(let order of this.orders) {
          for (let rest of success.restData) {
            if(order.restaurant == rest.restaurantId) {
              order.restaurant = rest
            }
          }
        }
        // console.log(this.foodData)
        console.log(this.orders)
      },
      (error) => {
        this.loading = false;
        if (typeof error.error.message == 'undefined') {
          this.errorMessage = 'Could not connect to server at the moment! Please try again later.'
        } else this.errorMessage = error.error.message;

      }
    )
  }

  changeStatus = (orderId, status) => {
    if (status === 'pickup'){
      this.serv.pickupOrder(orderId).subscribe(
        (success) => {
            console.log('Picked Up');
            window.location.reload();
        }
      );
    }else if (status === 'complete'){
      this.serv.deliverOrder(orderId).subscribe(
        (success) => {
          console.log('complete');
          window.location.reload();
        }
      );
    }else if (status === 'cancel'){
      this.serv.cancelOrder(orderId).subscribe(
        (success) => {
          console.log('cancelled');
          window.location.reload();
        }
      );
    }
  }

}
