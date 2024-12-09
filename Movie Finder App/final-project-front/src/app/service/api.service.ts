import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from "../user.service"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  sessionToken = this._userService.sessionToken;
  
  
  
  constructor(private _http: HttpClient, public _userService: UserService) { }







}
