import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SignupService} from 'src/app/services/signup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm:FormGroup;
confirm_passErr;
adminidErr;
resData;
regSuccMsg;
regFailMsg;

  constructor(private fb:FormBuilder, private signupSer:SignupService, private router:Router) { }

  ngOnInit() {

  		this.validate()
  }

  validate()
     {
        this.signupForm=this.fb.group({
             'username':['',Validators.required],
             'email':['',Validators.required],
             'password':['',Validators.required],
             'confirm_pass':['',Validators.required],
             'adminid':['',Validators.required]
         })
    }

  loginData()
	{
	    console.log("signing up...")
	    let username = this.signupForm.controls.username.value;
	    let email = this.signupForm.controls.email.value;
	    let password = this.signupForm.controls.password.value;
	    let confirm_pass = this.signupForm.controls.confirm_pass.value;
	    let adminid = this.signupForm.controls.adminid.value;

	    if(password != confirm_pass)
	    {
	    	this.confirm_passErr = true;
	    }

	    else if(adminid != 12345)
	    {
	    	this.adminidErr = true;
	    }

	    else
	    {
	    	let signupData = {
	    		username : username,
	    		email:email,
	    		password :password
	    	}

	    	this.signupSer.registerAdmin(signupData)
	    	.subscribe(res => {
	    		console.log(res);
	    		this.resData = res;
	    		if(this.resData.err == 0)
	    		{
	    			this.regSuccMsg = true;
	    			this.router.navigate(['/dashboard']);
	    		}
	    		else
	    		{
	    			this.regFailMsg = true;
	    		}
	    	});


	    }
   
	}

	removeconfirm_passErr(){
				this.confirm_passErr = undefined;
	}

	removeadminidErr(){
				this.adminidErr = undefined;
	}

	removeEmailAlreadyRegistered()
	{
		this.regFailMsg = undefined;
		this.regSuccMsg = undefined;
	}


}
