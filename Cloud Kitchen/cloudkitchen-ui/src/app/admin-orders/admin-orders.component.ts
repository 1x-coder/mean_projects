import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  [x: string]: any;
  order: any;
  errorMessage: any;
  successMessage: any;
  errorMessage1: any;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.order().subscribe(
      (s)=>{
        this.order=s;
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  }
  del(oId,status){
    this.service.upOrder(oId,status).subscribe(
      (s)=>{
        this.successMessage=s
      },
      (e)=>{
        this.errorMessage1 = e.error.message
      }
    )
  }

}
