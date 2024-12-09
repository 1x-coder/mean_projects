import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-edit-restaurant-profile',
  templateUrl: './restaurant-edit-restaurant-profile.component.html',
  styleUrls: ['./restaurant-edit-restaurant-profile.component.css']
})
export class RestaurantEditRestaurantProfileComponent implements OnInit {
  public restaurantData:any = JSON.parse(sessionStorage.getItem('current_user'));
  public restaurantImage:any
  public imageData:Blob
  public errorMessage:string=null
  public editForm:FormGroup
  public userData: FormData = new FormData();
   constructor(private service:RestaurantServiceService,private router:Router,private fb:FormBuilder) { }
 
   ngOnInit(): void {
     this.getRestaurantImage()
     
     this.editForm = this.fb.group({
      restaurantName: [this.restaurantData.restaurantName, [Validators.required]],
      restaurantMobile: [this.restaurantData.restaurantMobile, [Validators.required]],
      restaurantEmail:[this.restaurantData.restaurantEmail, [Validators.required]],
      restaurantAddress:[this.restaurantData.restaurantAddress, [Validators.required]],
      restaurantPincode:[this.restaurantData.restaurantPincode, [Validators.required]],
      restaurantAbout:[this.restaurantData.restaurantAbout, [Validators.required]],
      restaurantPassword:[this.restaurantData.restaurantPassword,[Validators.required]],
      restaurantPhoto:['',[Validators.required]]

    })
   }
   getRestaurantImage(){
     this.service.getRestaurantImage().subscribe(
       (image) => {this.restaurantImage = this.createImageFromBlob(image);
                   console.log(this.imageData);
                   this.imageData = image;
      }
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


  edit = () => {

    if (this.editForm.value.restaurantPhoto.length === 0){
       this.editForm.get('restaurantPhoto').setValue(this.imageData);
       console.log(1, this.editForm.value.restaurantPhoto);
       this.userData.append('restaurantPhoto', this.editForm.value.restaurantPhoto, this.restaurantData.restaurantPhoto);
    }else{
      console.log(2, this.editForm.value.restaurantPhoto);
      this.userData.append('restaurantPhoto', this.editForm.value.restaurantPhoto, this.restaurantData.restaurantPhoto);
    }
    this.userData.append('restaurantName', this.editForm.value.restaurantName);
    this.userData.append('restaurantMobile', this.editForm.value.restaurantMobile);
    this.userData.append('restaurantEmail', this.editForm.value.restaurantEmail);
    this.userData.append('restaurantAddress', this.editForm.value.restaurantAddress);
    this.userData.append('restaurantPincode', this.editForm.value.restaurantPincode);
    this.userData.append('restaurantAbout', this.editForm.value.restaurantAbout);
    this.userData.append('restaurantPassword', this.editForm.value.restaurantPassword);

    console.log(3, this.userData.get('restaurantPhoto'));

    this.service.editRestaurant(this.userData).subscribe(
      (success) => {
        console.log(success);
        sessionStorage.removeItem('current_user');
        sessionStorage.setItem('current_user', JSON.stringify(success));
        this.router.navigate(['restaurant/viewRestaurantProfile']);
      }
    );
  }
    checkFile = (event) => {
    if ( event.target.files.length > 0 ){
      const file = event.target.files[0];
      this.editForm.get('restaurantPhoto').setValue(file);
    }
   }

   discard(){
    this.router.navigate(['restaurant/viewRestaurantProfile']);
   }
 }
 