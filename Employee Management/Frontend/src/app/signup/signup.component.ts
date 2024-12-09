import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/utils/validation';
import Swal from 'sweetalert2';
import { faEye, faGhost } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
{
  faEye = faEye;
  faGhost = faGhost;

  form: FormGroup = new FormGroup
  ({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
        confirmPassword: ['',[ Validators.required,Validators.minLength(6),Validators.maxLength(16)]]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl }
  {
    return this.form.controls;
  }

  onSubmit(): void
  {
    this.submitted = true;

    if (this.form.invalid)
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'INVALID DETAILS !',
      })
    }

    else
    {
      console.log(JSON.stringify(this.form.value, null, 2));
      Swal.fire(
        'Account Created Successfully',
        'Go to LogIn Page',
        'success'
      )
      this.router.navigateByUrl('login');
    }

  }

  active = false;
  toggleShow()
  {
    this.active =!this.active;
  }

}
