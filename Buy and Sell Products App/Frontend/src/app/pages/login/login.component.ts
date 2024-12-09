import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from 'src/app/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private lser:LoginService,private router:Router) { }

  ngOnInit() {
  	this.validate();

  	 if(localStorage.getItem('loginStat')=="true")
      {
        this.router.navigate(["/"]);
      }
  }

myForm:FormGroup;
resData;

incorrectPassErr;

 validate()
 	{
 		this.myForm = this.fb.group({
 			'email':['',Validators.required],
 			'password':['',Validators.required]
 		})
 	}
 login()
 	{
 		let email = this.myForm.controls.email.value;
 		let password = this.myForm.controls.password.value;

 		 let data={
 		 	email:email,
 		 	password:password
 		 }

 		 this.lser.userLogin(data)
 		 .subscribe(res=>{
 		 	console.log(res);
 		 	this.resData=res;
 		 	if(this.resData.err==1)
 		 		{
 		 			this.incorrectPassErr=true;
 		 		}
 		 	else
 		 	{
 		 		localStorage.setItem('loginStat','true');
                localStorage.setItem('username',this.resData.username);
                localStorage.setItem('email',this.resData.email);
                localStorage.setItem('mobile',this.resData.mobile);
                // localStorage.setItem('mobile',mobile);
                
                location.reload();
 		 	}

 		 })

 	}

}
