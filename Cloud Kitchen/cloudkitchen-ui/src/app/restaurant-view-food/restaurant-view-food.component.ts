import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-view-food',
  templateUrl: './restaurant-view-food.component.html',
  styleUrls: ['./restaurant-view-food.component.css']
})
export class RestaurantViewFoodComponent implements OnInit {
  restaurantData:any=JSON.parse(sessionStorage.getItem('current_user'))
  foodDetailArray:any
  errorMessage:any
  constructor(private service:RestaurantServiceService,private router:Router) {  }

  ngOnInit(): void {
    this.getFoodDetails()
  }
  getFoodDetails(){
    
    this.service.getFoodDetails().subscribe(
      success=>{
        this.foodDetailArray=success
        console.log(this.foodDetailArray)
        },
      error=>this.errorMessage=error.error.Message
    )
}
editFood(fooddetail){
  this.router.navigate(['restaurant/editFood',fooddetail])
}
deleteFood(foodId){
  
  this.service.deleteFood(foodId).subscribe(
    success=>{
      window.location.reload()
      this.router.navigate(['restaurant/viewFood'])
      
      
    },
    error=>this.errorMessage=error.error.message
  )

  
}
}
