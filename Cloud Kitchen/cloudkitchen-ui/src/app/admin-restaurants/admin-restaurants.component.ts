import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {
  errorMessage: any;
  successMessage: any;
  errorMessage1: any;
  rest: any;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.rest().subscribe(
      (s)=>{
        this.rest=s;
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  }
  del(rId){
    this.service.delrest(rId).subscribe(
      (s)=>{
        this.successMessage=s
      },
      (e)=>{
        this.errorMessage1 = e.error.message
      }
    )
  }

}
