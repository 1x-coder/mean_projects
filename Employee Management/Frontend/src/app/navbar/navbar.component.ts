import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  constructor(private router: Router) {}
  isActive: string | null = null;

  setActive(item: string): void {
      this.isActive = item;
  }

  logout()
  {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['login']);
    Swal.fire
    (
      'Log Out Successfully',
      '',
      'success'
    )
  }

}
