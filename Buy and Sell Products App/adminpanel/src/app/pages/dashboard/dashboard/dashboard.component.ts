import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
username;
email;
  ngOnInit() {
  	this.username = localStorage.getItem('username');
  	this.email = localStorage.getItem('email');
  }

}
