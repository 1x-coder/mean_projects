import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LoginService} from 'src/app/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
resData;
loginErr;
  constructor(private fb:FormBuilder, private lser:LoginService, private router:Router) { }

  ngOnInit() {
      this.validate();
  }
  validate()
     {
        this.loginForm=this.fb.group({
             'email':['',Validators.required],
             'password':['',Validators.required]
         })
    }

loginData()
{
    console.log("logging in")
    let email=this.loginForm.controls.email.value;
    let password=this.loginForm.controls.password.value;
    
    let loginData = {
      email : email,
      password : password
    }

    this.lser.adminLogin(loginData)
    .subscribe(res => {
      console.log(res)
      this.resData=res;
      if(this.resData.err==1)
      {
        this.loginErr = true;
        localStorage.set
      }
      else
      {
        localStorage.setItem('username',this.resData.username);
        localStorage.setItem('email',this.resData.email);
        this.router.navigate(['/dashboard']);
      }

    })
}
}
