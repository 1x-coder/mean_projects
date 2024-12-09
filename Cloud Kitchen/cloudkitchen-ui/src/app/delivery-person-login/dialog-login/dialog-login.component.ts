import { Component, OnInit, Inject } from '@angular/core';
import { DeliveryPersonLoginComponent } from '../delivery-person-login/delivery-person-login.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeliveryPersonLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public route: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
    location.reload()
  }

  ngOnInit(): void {
    setTimeout(() => this.onNoClick(), 3000)
  }

}
