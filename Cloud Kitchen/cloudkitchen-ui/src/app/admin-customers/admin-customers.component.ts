import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  errorMessage: any;
  custi:any;
  errorMessage1: any;
  successMessage: any;

  constructor(private service: AdminService,) { }

  ngOnInit() {
    this.service.cust().subscribe(
      (s)=>{
        this.custi=s;
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  }
  del(cId){
    this.service.delcust(cId).subscribe(
      (s)=>{
        this.successMessage=s
      },
      (e)=>{
        this.errorMessage1 = e.error.message
      }
    )
  }

}
