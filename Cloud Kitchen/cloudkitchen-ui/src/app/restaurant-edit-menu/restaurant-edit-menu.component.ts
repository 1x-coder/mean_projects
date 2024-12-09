import { Component, OnInit } from '@angular/core';
import { RestaurantServiceService } from '../service/restaurant-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-restaurant-edit-menu',
  templateUrl: './restaurant-edit-menu.component.html',
  styleUrls: ['./restaurant-edit-menu.component.css']
})
export class RestaurantEditMenuComponent implements OnInit {
  id:any
  foodD:any
  errorMessage:any
  img:any
  imageData:Blob
  editFood:FormGroup
  userData: FormData = new FormData();
  constructor(private service: RestaurantServiceService, private fb: FormBuilder, private router: Router,private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    
     this.id= this.route.snapshot.paramMap.get('foodId')
     this.service.getFoodByFoodId(this.id).subscribe(
      success=>{
        this.foodD=success
        console.log(this.foodD)
        this.foodForm()
        this.getFoodImage()
        },
        

      error=>this.errorMessage=error.error.message
    )
   
    

     }
     foodForm(){
      this.editFood=this.fb.group({
        name:[this.foodD.name,[Validators.required]],
        description:[this.foodD.description,[Validators.required]],
        category:[this.foodD.category,[Validators.required]],
        type:[this.foodD.type,[Validators.required]],
        veg:[this.foodD.veg,[Validators.required]],
        price:[this.foodD.price,[Validators.required]],
        discount:[this.foodD.discount,[Validators.required]],
        available:[this.foodD.available,[Validators.required]],
        img:['',[Validators.required]],
        
   })
     }
    
     getFoodImage(){
     this.service.getFoodPictureById(this.foodD.img).subscribe(
      (image) => {this.img = this.createImageFromBlob(image);
                  this.imageData = image;
                   console.log(this.imageData);
      }
    );
  } 
  createImageFromBlob = (image: Blob) => {
         const reader = new FileReader();
        reader.addEventListener('load', () => {
           this.img = reader.result;
        }, false);
         if (image) {
            reader.readAsDataURL(image);
         }
      }

      checkFile = (event) => {
           if ( event.target.files.length > 0 ){
            const file = event.target.files[0];
            this.editFood.get('img').setValue(file);
          }
        }

        edit = () => {
         
          if (this.editFood.value.img.length === 0){
            console.log(3)
             this.editFood.get('img').setValue(this.imageData);
             this.userData.append('img', this.editFood.value.img, this.foodD.img);
             console.log(this.editFood.value.img)
        console.log(this.userData.getAll("img"));

          }else{
           console.log(4)
           this.userData.append('img', this.editFood.value.img, this.foodD.img);
           console.log(this.editFood.value.img);
           console.log(this.foodD.img);
        console.log(this.userData.getAll("img"));

          }
         this.userData.append('name', this.editFood.value.name);
         this.userData.append('description', this.editFood.value.description);
         this.userData.append('category', this.editFood.value.category);
         this.userData.append('type', this.editFood.value.type);
         this.userData.append('veg', this.editFood.value.veg);
         this.userData.append('price', this.editFood.value.price);
         this.userData.append('discount', this.editFood.value.discount);
         this.userData.append('available', this.editFood.value.available);
         this.userData.append('restaurantId', JSON.parse(sessionStorage.getItem('current_user')).restaurantId);
         this.userData.append('foodId', this.foodD.foodId);
         
        console.log(this.userData.getAll("foodId"))
        console.log(this.userData.getAll("restaurantId"))
        console.log(this.userData.getAll("img"));
        
          this.service.updateFood(this.userData).subscribe(
            (success) => {
              this.router.navigate(['restaurant/viewFood']);
            },
            (error)=>{this.errorMessage=error.error.message; console.log(JSON.stringify(error))}
          );
        }
  }








