import { Router } from '@angular/router';
import { CustomerService } from './../service/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  regForm: FormGroup ;
  errorMessage: string;
  userData: FormData = new FormData();
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      mobileNum: ['', [Validators.required, Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.max(999999), Validators.min(100000)]],
      profilePic: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register = () => {
    this.userData.append('userName', this.regForm.value.userName);
    this.userData.append('name', this.regForm.value.name);
    this.userData.append('email', this.regForm.value.email);
    this.userData.append('mobileNum', this.regForm.value.mobileNum);
    this.userData.append('address', this.regForm.value.address);
    this.userData.append('pincode', this.regForm.value.pincode);
    this.userData.append('password', this.regForm.value.password);
    this.userData.append('profilePic', this.regForm.value.profilePic, this.regForm.value.profilePic.name);
    console.log(this.userData);
    
    this.customerService.customer_register(this.userData).subscribe(
      (success) => {this.errorMessage = null;
                    console.log(this.userData);
                    this.router.navigate(['login'] );
    },
      (err) => { this.errorMessage = err.error.message; }
    );
  }

  checkFile = (event) => {
    if ( event.target.files.length > 0 ){
      const file = event.target.files[0];
      this.regForm.get('profilePic').setValue(file);
    }
  }

  loginRedirect = () => {
    this.router.navigate(['login']);
  }

}
