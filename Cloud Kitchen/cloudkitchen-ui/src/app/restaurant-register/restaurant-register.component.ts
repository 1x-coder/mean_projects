import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.css']
})
export class RestaurantRegisterComponent implements OnInit {
  public registerForm:FormGroup
  userData: FormData = new FormData();
  public selectedFile = null;
  public errorMessage:string=null
  constructor(private fb:FormBuilder,private service:RestaurantServiceService,private router:Router) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      restaurantName: ['', [Validators.required]],
      restaurantMobile: ['', [Validators.required]],
      restaurantEmail:['', [Validators.required]],
      restaurantAddress:['', [Validators.required]],
      restaurantPincode:['', [Validators.required]],
      restaurantAbout:['', [Validators.required]],
      restaurantPassword:['',[Validators.required]],
      restaurantPhoto:['',[Validators.required]]

    })
  }
  registerUser(){
    this.userData.append('restaurantName', this.registerForm.value.restaurantName);
    this.userData.append('restaurantMobile', this.registerForm.value.restaurantMobile);
    this.userData.append('restaurantEmail', this.registerForm.value.restaurantEmail);
    this.userData.append('restaurantAddress', this.registerForm.value.restaurantAddress);
    this.userData.append('restaurantPincode', this.registerForm.value.restaurantPincode);
    this.userData.append('restaurantAbout', this.registerForm.value.restaurantAbout);
    this.userData.append('restaurantPassword', this.registerForm.value.restaurantPassword);
    this.userData.append('restaurantPhoto', this.registerForm.value.restaurantPhoto, this.registerForm.value.restaurantPhoto.name);
    console.log(this.userData);

        this.service.restaurantRegister(this.userData).subscribe(
          success=>{
            
            this.router.navigateByUrl("/restaurant/login")
          },
          error=>{
            
            this.errorMessage=error.error.message
          }
        )
  }
  checkFile = (event) => {
    
    if ( event.target.files.length > 0 ){
     
      const file = event.target.files[0];
      this.registerForm.get('restaurantPhoto').setValue(file);
    }
  }

 


}
