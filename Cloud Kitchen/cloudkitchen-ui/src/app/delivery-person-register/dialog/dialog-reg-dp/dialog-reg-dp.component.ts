import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryPersonRegisterComponent } from '../../delivery-person-register/delivery-person-register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-reg-dp',
  templateUrl: './dialog-reg-dp.component.html',
  styleUrls: ['./dialog-reg-dp.component.css']
})
export class DialogRegDpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeliveryPersonRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public route: Router) { }

  onNoClick(): void {
    this.route.navigate(['/deliveryperson/login'])
    this.dialogRef.close();
  }

  ngOnInit(): void {
    setTimeout(() => this.onNoClick(), 4000)
  }

}
