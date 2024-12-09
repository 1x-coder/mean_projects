import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit
{

  editMode: boolean = false;
  employees: Employee[] = [];
  selectedEmployee!: Employee;

  empForm: FormGroup = new FormGroup
  ({
    _id: new FormControl(""),
    empno: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]+$')]),
    empname: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern('[a-zA-Z ]+$')]),
    jobrole: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9 ]+$')]),
    salary: new FormControl('',[Validators.required,Validators.pattern('[0-9]+$')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]+$')])
  });
  
  // submitted = false;

  get empno()
  {
    return this.empForm.get('empno');
  }
  
  get empname()
  {
    return this.empForm.get('empname');
  }

  get jobrole()
  {
    return this.empForm.get('jobrole');
  }

  get salary()
  {
    return this.empForm.get('salary');
  }

  get email()
  {
    return this.empForm.get('email');
  }

  get phone()
  {
    return this.empForm.get('phone');
  }

  constructor( private _empService:EmployeeService) { }

  ngOnInit(): void
  {
    this.getEmployees();

  }

  onAddEmployee()
  {
    this.editMode = false;
    this.empForm.reset();
    
  }

  onCloseModal()
  {
    // this.editMode = false;
  }

  onEditEmployee(emp:Employee)
  {
    this.editMode = true;
    this.selectedEmployee = emp;
    console.log(this.selectedEmployee);
    this.empForm.patchValue(this.selectedEmployee);
  }

  getEmployees()
  {
    this._empService.getEmployeeList().subscribe(
      (res) => {
        console.log(res);
        this.employees = res as Employee[];
      },
      (err) => {
        console.warn(err);
      }
    )
  }

  onEmpSubmit()
  {
    if(this.empForm.valid)
    {
      console.log("Update",this.empForm.value);
      if(this.editMode)
      {
        this._empService.putEmployee(this.empForm.value,this.selectedEmployee._id).subscribe(
          (res) => {
            console.log('Updated Successfully');
            Swal.fire(
              'Updated',
              'Employee Details Updated',
              'success'
            )
            this.getEmployees();
            // this.editMode = false;
          },
          (err) => {
            console.warn(err);
            Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'INVALID DETAILS !'
            })
          },
        );
        // this.empForm.reset();
        this.onCloseModal();
      }
      else
      {
        this.editMode = false;
        this._empService.postEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log('Added Successfully');
            this.empForm.reset();
            Swal.fire(
              'Submitted',
              'New Employee Added',
              'success')
            this.getEmployees();
          },
          (err) => {
            console.warn(err);
            Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'INVALID DETAILS !'
            })
          },
        );
      }
      // this.empForm.reset();
      this.onCloseModal();
      let ref = document.getElementById('cancel');
      ref?.click();
    }
    else
    {
      let key = Object.keys(this.empForm.controls);
      console.log(key);

      key.filter(data =>{
        console.log(data);
        let control = this.empForm.controls[data];
        console.log(control);
        if(control.errors !=null)
        {
          control.markAsTouched();
        }
      })
    }
  }

  onDeleteEmployee(id: String)
  {
    Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
    if (result.isConfirmed)
    {
      console.log(id);
      this._empService.deleteEmployee(id).subscribe(
        (res) => {
          console.warn('Delete successfully');
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          )
          this.getEmployees();
        },
        (err) => {
          console.warn(err);
        },
      );
    }})
  }

  

  // onSubmit(data:any)
  // {
  //   if(this.empForm.invalid)
  //   {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'INVALID DETAILS !'
  //     })
  //   }
  //   else
  //   {
  //     console.log(data);
  //     console.warn("Employee has been Added");
  //     Swal.fire(
  //       'Submitted',
  //       'New Employee Added',
  //       'success'
  //     )
  //     this.empForm.reset()
  //   }
  // }

  // onClick()
  // {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => 
  //   {
  //     if (result.isConfirmed)
  //     {
  //       Swal.fire(
  //         'Deleted!',
  //         'Employee has been deleted.',
  //         'success'
  //       )
  //       console.warn("Employee has been Deleted");
  //     }
  //   })
  // }


}
