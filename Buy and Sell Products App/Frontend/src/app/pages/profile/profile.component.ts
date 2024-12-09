import { Component, OnInit } from '@angular/core';
import {ProfileService} from 'src/app/services/profile.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

updateForm:FormGroup;

minDate = new Date(1950, 0, 1);
maxDate = new Date(2020, 0, 1);
startDate = new Date(1998, 19, 6);



defaultProfileImg;

resProfile;
  constructor(private pser:ProfileService, private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
  	// this.defaultProfileImg = "assets/img/defaultProfile.png";

  	this.validateUpdate();

  	this.pser.getUserProfile({email:localStorage.getItem('email')})
  	.subscribe(res=>{
  		console.log(res);
  		this.resProfile=res;
  		this.resProfile=this.resProfile.profile;

  		if(this.resProfile[0].img=='NA')
  		{
  			this.defaultProfileImg = "assets/img/defaultProfile.png";
  		}
  		else
  		{
  			this.defaultProfileImg  = this.resProfile[0].img;
  		}
  	})


  }

  validateUpdate()
  	{
  		this.updateForm = this.fb.group({
  			'name':['',Validators.required],
  			'email':['',Validators.required],
  			'dob':['',Validators.required],
  			'mobile':['',Validators.required],
  			'locality':['',Validators.required],
  			'city':['',Validators.required]
  		})
  	}

  url;
  detectFiles(event) {
    // this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          // this.urls.push(e.target.result);
          this.url=e.target.result;
          this.defaultProfileImg = this.url;
        }
        reader.readAsDataURL(file);
        
    	
      }
      
    }


  }


  updateProfile()
  {
  	console.log('updating profile')

  	let name=this.updateForm.controls.name.value;
  	if(name==""){name=this.resProfile[0].username}

  	let email=this.resProfile[0].email;

  	let dob=this.updateForm.controls.dob.value;
  	if(dob==""){dob=this.resProfile[0].dob}

  	let mobile=this.updateForm.controls.mobile.value;
  	if(mobile==""){mobile=this.resProfile[0].mobile}

  	let locality=this.updateForm.controls.locality.value;
  	if(locality==""){locality=this.resProfile[0].locality}
  	
  	let city=this.updateForm.controls.city.value;
  	if(city==""){city=this.resProfile[0].city}

  	let img
  	if(this.url != undefined )
  	{ img=this.url}
  	else if(this.resProfile[0].img !='NA')
  	 {img=this.resProfile[0].img}
  	else
  		{img='NA'}

  	
  	let data={
  		name:name,
  		email:email,
  		dob:dob,
  		mobile:mobile,
  		locality:locality,
  		city:city,
  		img:img
  	}

  	console.log(data);

  	this.pser.updateProfile(data)
  	.subscribe(res=>
  	{
  		console.log(res);


  		// const Toast = Swal.mixin({
    //         toast: true,
    //         position: 'bottom-right',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true
    //       })

    //       Toast.fire({
    //         icon: 'success',
    //         title: 'Profile updated successfully'
    //       })

  		this.ngOnInit()

  	})
  }


}
