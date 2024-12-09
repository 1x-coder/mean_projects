import { Router } from '@angular/router';
import { DeliveryPersonServiceService } from 'src/app/service/delivery-person-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-person-view-profile',
  templateUrl: './delivery-person-view-profile.component.html',
  styleUrls: ['./delivery-person-view-profile.component.css']
})
export class DeliveryPersonViewProfileComponent implements OnInit {

  user: any = JSON.parse(sessionStorage.getItem('current_user'));
  profilePic: any;
  constructor(private serv: DeliveryPersonServiceService, private router: Router) { }

  ngOnInit(): void {
    this.serv.getProfilePicture().subscribe(
      (image) => {this.profilePic = this.createImageFromBlob(image);}
    );
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

 goToEdit = () => {
   this.router.navigate(['deliveryperson/edit-profile']);
 }

}
