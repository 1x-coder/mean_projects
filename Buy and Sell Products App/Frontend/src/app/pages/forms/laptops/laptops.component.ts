import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FormsService} from 'src/app/services/forms.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
constructor(private fb:FormBuilder, private forms:FormsService,private router:Router) { }
myForm:FormGroup;
  ngOnInit() {

        this.validate();
// console.log(this.myForm.controls['fuel'].value);

    this.urls.push("assets/img/activeImg.png");
    this.urls.push("assets/img/disabledImg.png");
    this.countImg=0;
  }

 urls = []
countImg;
firstTime;
imgErr;
  detectFiles(event,index) {
    this.firstTime=true;
    if(index==0 && this.countImg==0)
      this.urls[1]="assets/img/activeImg.png";

   this.countImg+=1;
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          // this.urls.push(e.target.result);
            this.urls[index]=e.target.result;
          
        }
        reader.readAsDataURL(file);
      }
    }
  
  }

 

  validate()
    {
      this.myForm = this.fb.group({
        'brand':['',Validators.required],
        'model':['',Validators.required],
        // 'slots':['',Validators.required],
        'description':['',Validators.required],
        'year_reg':['',Validators.required],
        // 'memory':['',Validators.required],
        'city':['',Validators.required],
        'locality':['',Validators.required],
        'price':['',Validators.required],
      })
    }

  postCar()
    {
      let brand = this.myForm.controls.brand.value;
      let model = this.myForm.controls.model.value;
      let description = this.myForm.controls.description.value;
      let year_reg = this.myForm.controls.year_reg.value;
      // let memory = this.myForm.controls.memory.value;
      let city = this.myForm.controls.city.value;
      let locality = this.myForm.controls.locality.value;
      let price = this.myForm.controls.price.value;
      // let slots = this.myForm.controls.slots.value;

        if(this.countImg<2)
        {
          console.log("Image not selected")
          this.imgErr=true;
        }
        else
        {
          let data={
            category:'laptops computers',
            sold:false,
            premium:false,
            likes:0,
            visits:0,
            state:true,
            mobile:localStorage.getItem('mobile'),
            seller:localStorage.getItem('username'),
            selleremail:localStorage.getItem('email'),
            brand:brand,
            model:model,
            description:description,
            year_reg:year_reg,
            // memory:memory,
            city:city,
            locality:locality,
            price:price,
            // slots:slots,
            img1:this.urls[0],
            img2:this.urls[1]
          }
          // console.log(data)
          this.forms.postcar(data)
          .subscribe(res=>{
            console.log(res);
            Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Your Ad has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
            this.router.navigate(['/myads']);

            

          })
        }


    }

}
