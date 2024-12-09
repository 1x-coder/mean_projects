import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryPersonServiceService } from '../../service/delivery-person-service.service';
import { DialogRegDpComponent } from '../dialog/dialog-reg-dp/dialog-reg-dp.component';


@Component({
  selector: 'app-delivery-person-register',
  templateUrl: './delivery-person-register.component.html',
  styleUrls: ['./delivery-person-register.component.css'],
})


export class DeliveryPersonRegisterComponent implements OnInit {
  public regForm: FormGroup;
  public successMessage: string;
  public errorMessage: string;
  public loading: boolean = false;
  public selectedFile = null;

  constructor(
    private fb: FormBuilder,
    private service: DeliveryPersonServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      mobileNum: [
        '',
        [
          Validators.required,
          Validators.min(6000000000),
          Validators.max(9999999999),
        ],
      ],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      reEnterPass: ['', [Validators.required]]
    }, { validator: validateReenteredPassword });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
  }

  openDialog(message) {
    const dialogRef = this.dialog.open(DialogRegDpComponent, {
      width: '350px',
      data: {name: this.regForm.value.name, message: message}
    });

  }

  registerUser() {
    this.successMessage = '';
    this.errorMessage = '';
    let regData = new FormData();
    regData.append('deliveryPersonImage', this.selectedFile, this.selectedFile.name)
    regData.append('name', this.regForm.value.name)
    regData.append('password', this.regForm.value.password);
    regData.append('email', this.regForm.value.email);
    regData.append('mobileNum', this.regForm.value.mobileNum);
    this.loading = true;
    this.service.registerDeliveryPerson(regData).subscribe(
      (success) => {
        this.loading = false
        this.successMessage = success.message;
        this.openDialog(this.successMessage);
      },
      (err) => {
        this.loading = false
        this.errorMessage = err.error.message;
        if (err.error.message == null) {
          this.errorMessage = "Unable to register at the moment. Please try again later."
        }
      }
    )
  }
}

function validateReenteredPassword(input: FormGroup) {
  let pass = input.get('password').value;
  let confPass = input.get('reEnterPass').value;
  return pass === confPass ? null : { "passwordMatchErr": true }
}
