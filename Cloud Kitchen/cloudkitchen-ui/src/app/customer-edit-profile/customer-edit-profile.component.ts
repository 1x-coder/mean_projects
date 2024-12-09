import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from './../service/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-edit-profile',
  templateUrl: './customer-edit-profile.component.html',
  styleUrls: ['./customer-edit-profile.component.css']
})
export class CustomerEditProfileComponent implements OnInit {

  user: any = JSON.parse(sessionStorage.getItem('current_user'));
  profilePic: any;
  imageData: Blob;
  editForm: FormGroup;
  userData: FormData = new FormData();
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getProfilePicture().subscribe(
      (image) => {this.profilePic = this.createImageFromBlob(image);
                  this.imageData = image;
                  console.log(this.imageData);
      }
    );

    this.editForm = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      mobileNum: [this.user.mobileNum, [Validators.required, Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      address: [this.user.address, [Validators.required]],
      pincode: [this.user.pincode, [Validators.required, Validators.max(999999), Validators.min(100000)]],
      profilePic: ['', [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  createImageFromBlob = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.profilePic = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 checkFile = (event) => {
  if ( event.target.files.length > 0 ){
    const file = event.target.files[0];
    this.editForm.get('profilePic').setValue(file);
  }
 }

 edit = () => {
   if (this.editForm.value.profilePic.length === 0){
      this.editForm.get('profilePic').setValue(this.imageData);
      this.userData.append('profilePic', this.editForm.value.profilePic, this.user.profilePic);
   }else{
      this.userData.append('profilePic', this.editForm.value.profilePic, this.user.profilePic);
   }
   this.userData.append('userName', this.editForm.value.userName);
   this.userData.append('name', this.editForm.value.name);
   this.userData.append('email', this.editForm.value.email);
   this.userData.append('mobileNum', this.editForm.value.mobileNum);
   this.userData.append('address', this.editForm.value.address);
   this.userData.append('pincode', this.editForm.value.pincode);
   this.userData.append('password', this.editForm.value.password);

   this.customerService.updateProfile(this.userData).subscribe(
     (success) => {
       sessionStorage.removeItem('current_user');
       sessionStorage.setItem('current_user', JSON.stringify(success));
       this.router.navigate(['view-profile']);
     }
   );
 }

}
