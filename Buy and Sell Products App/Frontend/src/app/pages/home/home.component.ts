import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private catser:CategoryService, private fb:FormBuilder,private router:Router) { }
categoryForm:FormGroup;

resData;
userName;
userEmail;  
regName;  
  ngOnInit() {
      this.validate()

      this.userName="Login";
      this.regName="/Register"
     if(localStorage.getItem('loginStat')=="true")
      {
        this.userName=localStorage.getItem('username');
        this.userEmail=localStorage.getItem('email');
        this.regName="";
      }

      this.catser.getCat()
      .subscribe(res=>{
          console.log(res);
          this.resData=res;
          this.resData=this.resData.cdata;
      })
  }


  validate()
    {
      this.categoryForm = this.fb.group(
      {
        'category':['',Validators.required]
      })
    }

  selectCategory()
    {
      if(localStorage.getItem('loginStat')=='true')
      {
      let catName=this.categoryForm.controls.category.value;
      console.log(catName)
      if(catName == 'cars')
          this.router.navigate(["/cars"])
      else if(catName == 'bikes')
          this.router.navigate(["/bikes"])
      else if(catName == 'mobiles & tablets')
          this.router.navigate(['/mobiles'])
      else if(catName == 'laptops & computers')
          this.router.navigate(['/laptops'])
      else if(catName == 'books')
          this.router.navigate(['/books'])
      else if(catName == 'clothes')
          this.router.navigate(['/clothes'])
      else if(catName == 'homeappliances')
          this.router.navigate(['/homeappliances'])
      else if(catName == 'furnitures')
          this.router.navigate(['/furnitures'])
      }
      else
      {
          Swal.fire({
  
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href>Why do I have this issue?</a>'
})
        this.router.navigate(['/login']);
      }

    }

    logout()
      {
        localStorage.removeItem('username')
        localStorage.removeItem('loginStat')
        localStorage.removeItem('email')
        localStorage.removeItem('mobile')
        location.reload()
      }

  search()
  {
    console.log("searching")
    this.router.navigate(['/search'])
  }

}
