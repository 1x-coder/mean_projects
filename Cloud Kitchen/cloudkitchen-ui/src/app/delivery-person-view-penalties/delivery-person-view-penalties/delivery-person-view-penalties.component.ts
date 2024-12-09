import { Component, OnInit } from '@angular/core';
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';

@Component({
  selector: 'app-delivery-person-view-penalties',
  templateUrl: './delivery-person-view-penalties.component.html',
  styleUrls: ['./delivery-person-view-penalties.component.css']
})
export class DeliveryPersonViewPenaltiesComponent implements OnInit {
  order: any
  errorMessage: any;
  successMessage: any;
  errorMessage1: any;
  constructor(private service: DeliveryPersonServiceService) { }

  ngOnInit(): void {
    this.service.pen().subscribe(
      (s)=>{
        this.order=s; 
      },
      (e)=>{
        this.errorMessage1 = e.error.message; 
      }
    )
  
  }

  pay(pId){
    this.service.upen(pId).subscribe(
      (s)=>{
        if(s){
          this.successMessage="Updated Successfully!!"
        }; 
      },
      (e)=>{
        this.errorMessage = e.error.message; 
      }
    )
  
  }

}
