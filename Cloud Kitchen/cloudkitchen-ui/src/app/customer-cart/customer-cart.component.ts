import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  orderingCart: any;
  user: any = JSON.parse(sessionStorage.getItem('current_user'));
  totalPrice: number = 0;
  orderObj: any = {};
  foodIds: Array<string> = [];
  restId: string;
  constructor(private customerService: CustomerService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.orderingCart = this.customerService.getOrderedFood();
    for (const orders of this.orderingCart){
      this.totalPrice += (orders.price * ( 1 - (orders.discount / 100)));
      this.foodIds.push(orders.foodId);
      this.restId = orders.restaurantId;
    }

    this.orderObj.deliveryPerson = '';
    this.orderObj.food = this.foodIds;
    this.orderObj.state = 'Pending';
    this.orderObj.restaurant = this.restId;
    this.orderObj.customer = this.user.customerId;
    this.orderObj.totalCost = this.totalPrice;
    this.orderObj.deliveryCost = 50;
    this.orderObj.orderDate = new Date().toDateString();

  }

  order = () => {
    this.customerService.orderFood(this.orderObj).subscribe(
      (success) => {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent);
        confirmDialog.afterClosed().subscribe(
          (result) => {
            this.router.navigate(['']);
          }
        );
      }
    );
  }

}
