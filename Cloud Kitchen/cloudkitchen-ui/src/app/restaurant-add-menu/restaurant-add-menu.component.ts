import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-add-menu',
  templateUrl: './restaurant-add-menu.component.html',
  styleUrls: ['./restaurant-add-menu.component.css']
})
export class RestaurantAddMenuComponent implements OnInit {
  public errorMessage:string=null
  public foodForm:FormGroup
  userData: FormData = new FormData();
  public selectedFile = null;
  public restaurantData:any = JSON.parse(sessionStorage.getItem('current_user'));
  constructor(private fb:FormBuilder,private service:RestaurantServiceService,private router:Router) { }

  ngOnInit(): void {
    this.foodForm=this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      category:['',[Validators.required]],
      type:['',[Validators.required]],
      veg:[''],
      price:['',[Validators.required]],
      discount:['',[Validators.required]],
      available:[false],
      img:[false],
      restaurantId:[this.restaurantData.restaurantId]
    })
  }
  addFood(){
    
    this.userData.append('name', this.foodForm.value.name);
    this.userData.append('description', this.foodForm.value.description);
    this.userData.append('category', this.foodForm.value.category);
    this.userData.append('type', this.foodForm.value.type);
    this.userData.append('veg', this.foodForm.value.veg);
    this.userData.append('price', this.foodForm.value.price);
    this.userData.append('discount', this.foodForm.value.discount);
    this.userData.append('available', this.foodForm.value.available);
    this.userData.append('restaurantId', this.foodForm.value.restaurantId);
    this.userData.append('img', this.foodForm.value.img, this.foodForm.value.img.name);
    console.log(this.userData);

        this.service.restaurantAddMenu(this.userData).subscribe(
          success=>{
            
            this.router.navigateByUrl("/restaurant/viewFood")
          },
          error=>{
            
            this.errorMessage=error.error.message
          }
        )
  

  }
  checkFile = (event) => {
    
    if ( event.target.files.length > 0 ){
      

      const file = event.target.files[0];
      console.log(file)
      this.foodForm.get('img').setValue(file);
    }
  }

}
