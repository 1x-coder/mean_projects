import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';

@Component({
  selector: 'app-delivery-person-update-profile',
  templateUrl: './delivery-person-update-profile.component.html',
  styleUrls: ['./delivery-person-update-profile.component.css']
})
export class DeliveryPersonUpdateProfileComponent implements OnInit {

  user: any = JSON.parse(sessionStorage.getItem('current_user'));
  deliveryPersonImage: any;
  imageData: Blob;
  editForm: FormGroup;
  userData: FormData = new FormData();
  constructor(private serv: DeliveryPersonServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.serv.getProfilePicture().subscribe(
      (image) => {this.deliveryPersonImage = this.createImageFromBlob(image);
                  this.imageData = image;
                  console.log(this.imageData);
      }
    );

    this.editForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      mobileNum: [this.user.mobileNum, [Validators.required, Validators.pattern(/^[6-9]+[0-9]{9}$/)]],
      penalties: [this.user.penalties, [Validators.required, Validators.max(999999), Validators.min(100000)]],
      deliveryPersonImage: ['', [Validators.required]],
    });
  }

  createImageFromBlob = (image: Blob) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.deliveryPersonImage = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 checkFile = (event) => {
  if ( event.target.files.length > 0 ){
    const file = event.target.files[0];
    this.editForm.get('deliveryPersonImage').setValue(file);
  }
 }

 edit = () => {
   if (this.editForm.value.deliveryPersonImage.length === 0){
      this.editForm.get('deliveryPersonImage').setValue(this.imageData);
      this.userData.append('deliveryPersonImage', this.editForm.value.deliveryPersonImage, this.user.deliveryPersonImage);
   }else{
      this.userData.append('deliveryPersonImage', this.editForm.value.deliveryPersonImage, this.user.deliveryPersonImage);
   }
   this.userData.append('name', this.editForm.value.name);
   this.userData.append('email', this.editForm.value.email);
   this.userData.append('mobileNum', this.editForm.value.mobileNum);
   this.userData.append('penalties', this.editForm.value.penalties);
   this.userData.append('pincode', this.editForm.value.pincode);

   this.serv.updateProfile(this.userData).subscribe(
     (success) => {
       sessionStorage.removeItem('current_user');
       sessionStorage.setItem('current_user', JSON.stringify(success));
       this.router.navigate(['deliveryperson/view-profile']);
     }
   );
 }

}
