import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import{RestaurantServiceService} from 'src/app/service/restaurant-service.service'
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent implements OnInit {
  public loginForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  constructor(private fb:FormBuilder,private service:RestaurantServiceService,private router:Router) { 
         
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  loginUser(){
    console.log("i am here")
    this.service.restaurantLogin(this.loginForm.value).subscribe(
      
      success=>{
        this.errorMessage = null;
                     sessionStorage.setItem('current_user', JSON.stringify(success.user));
                     sessionStorage.setItem('token', success.token);
                     sessionStorage.setItem('user_type', 'restaurant');
                     sessionStorage.setItem('expires', JSON.stringify( moment().add(success.expiresIn).valueOf()));
                     window.location.replace('http://localhost:4200/restaurant/home');
                    //  this.router.navigate(['/restaurant/home']);
                     
      },
      error=>{
           this.errorMessage=error.error.message
      }
    )
  
}
}

