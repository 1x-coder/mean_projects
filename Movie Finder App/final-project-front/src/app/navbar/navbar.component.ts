import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service"
import { Router } from "@angular/router"
import { ApihandlerService } from "../apihandler.service"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = sessionStorage.getItem("userId");

  constructor(public _userService: UserService, private _router: Router, public _api: ApihandlerService) { }

  ngOnInit(): void {
  }





}
