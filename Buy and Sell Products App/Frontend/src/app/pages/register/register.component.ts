import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from 'src/app/services/register.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private rser:RegisterService, private router:Router) { }


  ngOnInit() {
      this.validate();
      
      if(localStorage.getItem('loginStat')=="true")
      {
        this.router.navigate(["/"]);
      }
  }
myForm:FormGroup;
otpForm:FormGroup;

confirmPassErr;  
otp;  
email;
wrongOtp;
registerRes;
 validate()
     {
        this.myForm=this.fb.group({
             'name':['',Validators.required],
             'mobile':['',Validators.required],
             'email':['',Validators.required],
             'password':['',Validators.required],
             'confirm_pass':['',Validators.required]
         })
        this.otpForm = this.fb.group({
          'enteredOtp':['',Validators.required]
        })
    }

  register()
    {
       let name=this.myForm.controls.name.value;
       let mobile=this.myForm.controls.mobile.value;
       let email=this.myForm.controls.email.value;
       let password=this.myForm.controls.password.value;
       let confirm_pass=this.myForm.controls.confirm_pass.value;
       
       this.email=email;

       if(password != confirm_pass)
          {
            this.confirmPassErr = true;
          }
        else
        {
            let data={
              name:name,
              email:email
            }
            this.otp=undefined;
            this.rser.sendOTP(data)
            .subscribe(res=>{
              console.log(res);
              this.otp=res;
              if(this.otp.err==0)
              {
                this.otp=this.otp.otp;

              }
            })
        }
    }

    OtpConfirmSignup()
      {
        let enteredOtp=this.otpForm.controls.enteredOtp.value;

          if(enteredOtp != this.otp )
          {
            this.wrongOtp=true;
          }

          else
          {
            //allow to signup 
            let name=this.myForm.controls.name.value;
            let mobile=this.myForm.controls.mobile.value;
            let email=this.myForm.controls.email.value;
            let password=this.myForm.controls.password.value;

            let data = {
              name:name,
              mobile:mobile,
              email:email,
              password:password
            }

            this.rser.registerUser(data)
            .subscribe(res=>{
              console.log(res);
              this.registerRes=res;
               if(this.registerRes.err ==0)
               {
                localStorage.setItem('loginStat','true');
                localStorage.setItem('username',name);
                localStorage.setItem('email',email);
                localStorage.setItem('mobile',mobile);
                
                location.reload();
                
               }
            })

          }
      }


  removeConfirmPassErr()
   {
    this.confirmPassErr=undefined;
   }

   removeOtpErr(){
    this.wrongOtp=undefined;
   }
}
