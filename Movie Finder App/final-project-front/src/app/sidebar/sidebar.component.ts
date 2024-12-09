
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { UserService } from '../user.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



list: any = [];





  constructor( private _http : HttpClient, public _userService: UserService ) { }

  ngOnInit() {
  
  }


  
  


}
