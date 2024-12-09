import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-view-restaurant-profile',
  templateUrl: './restaurant-view-restaurant-profile.component.html',
  styleUrls: ['./restaurant-view-restaurant-profile.component.css']
})
export class RestaurantViewRestaurantProfileComponent implements OnInit {
 public restaurantData:any = JSON.parse(sessionStorage.getItem('current_user'));
 public restaurantImage:any
 public errorMessage:string=null
  constructor(private service:RestaurantServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getRestaurantImage()
  }
  getRestaurantImage(){
    this.service.getRestaurantImage().subscribe(
      (image) => {this.restaurantImage = this.createImageFromBlob(image);
        console.log(this.restaurantImage)}
    );

    
  }
  createImageFromBlob = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.restaurantImage = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }
  
  goToEdit(){
    this.router.navigate(['restaurant/editRestaurantProfile']);
  }
}
