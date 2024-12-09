import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import Swal  from  'sweetalert2';
import {Router} from '@angular/router';
import {CategoryService} from 'src/app/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
myForm : FormGroup;
  constructor(private fb:FormBuilder, private catser:CategoryService, private router:Router) { }

  ngOnInit() {
      this.validate();  
  }
    
catImg;
imgName;
imgSize;
 
fadeInImg = false;
    
//image show start
public imagePath;
imgURL: any;
public message: string;

preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    
    this.fadeInImg=true;
  }
//img show end

//img upload
  fileUpload(event)
  {
  	if(event.target.files.length>0)
  	{
  		this.catImg=event.target.files[0];
  		console.log(this.catImg);
      this.imgName=this.catImg.name;
      this.imgSize=this.catImg.size;
      console.log(this.imgName);
  	}
  }

// img upload end
validate()
     {
        this.myForm=this.fb.group({
             'catName':['',Validators.required],
             'catDescription':['',Validators.required]
         })
     }


 addCategory()
    {
         if(this.imgName==undefined)
    {
      Swal.fire({
  type: 'error',
  title: 'Oops...',
  text: 'Select Image before submitting !',
                })
    }
    else{
    let formData=new FormData();
    formData.append('catName',this.myForm.controls.catName.value);
    formData.append('catDescription',this.myForm.controls.catDescription.value);
    formData.append('Image',this.catImg);
    this.catser.addCat(formData)
    .subscribe(res=>
      {
        console.log(res);
        Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Category saved successfully!',
  showConfirmButton: false,
  timer: 1500
})

this.router.navigate(['/dashboard/category']);
  
})
  }
    }
    
    
}
