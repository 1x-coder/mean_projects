import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from '../service/customer.service';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-customer-view-orders',
  templateUrl: './customer-view-orders.component.html',
  styleUrls: ['./customer-view-orders.component.css']
})
export class CustomerViewOrdersComponent implements OnInit {
  order: any;
  errorMessage: any;
  successMessage: any;
  errorMessage1: any;
  customer:any;
  custId:any;
  food:any;
  resti: any;
  fid: String='';
  oId: any;
  constructor(private service: CustomerService,public dialog: MatDialog) { }

  ngOnInit(): void {    
    this.service.viewOrders().subscribe(
      (s)=>{
        this.order=s;
        for(let o of this.order){
          this.oId=o.orderId
          this.service.restaurantDetails(o.restaurant).subscribe(     
            (s)=>{
              this.resti=s.restaurantName
            },
            (e)=>{
              this.errorMessage = e.error.message; 
            }
          )
          }         
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  
  }
  find(food){
    this.food=[]
    this.fid='______'
    var name=0
    for(let f of food){     
                   
      this.service.getFoodDetails(f).subscribe(
        (s)=>{
          this.fid=this.fid+s.name+"------>Qantity:1_______"
          name++
          if(name===food.length){
            this.dialog.open(DialogDataExampleDialog, {
              data: {
                Order:this.fid
              }
            });
          }
          
        },
        (e)=>{
          this.errorMessage1 = e.error.message; 
        }
      )
    
    }
    
  } 
  cancleo(oId) {
    this.service.cancleo(oId).subscribe(
      (s)=>{
        this. successMessage=s;
        window.location.reload()
      },
      (e)=>{
        this.errorMessage = e.error.message;
      }
    )
  }
    
  
}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'd.html',
})
export class DialogDataExampleDialog {
  th:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(){
  }
 
}