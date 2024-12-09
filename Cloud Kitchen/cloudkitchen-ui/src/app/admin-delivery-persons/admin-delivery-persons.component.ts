import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-delivery-persons',
  templateUrl: './admin-delivery-persons.component.html',
  styleUrls: ['./admin-delivery-persons.component.css']
})
export class AdminDeliveryPersonsComponent implements OnInit {
  successMessage: any;
  errorMessage: any;
  errorMessage1: any;
  deli: any;

  constructor(private service: AdminService) { }

  ngOnInit() {
    this.service.delper().subscribe(
      (s)=>{
        this.deli=s;
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  }
  del(dId){
    this.service.deldelper(dId).subscribe(
      (s)=>{
        this.successMessage=s
      },
      (e)=>{
        this.errorMessage1 = e.error.message
      }
    )
  }

}
