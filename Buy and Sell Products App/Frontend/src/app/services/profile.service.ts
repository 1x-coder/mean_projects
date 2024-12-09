import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

url= "http://localhost:7000/api/";
// url= "http://54.180.142.192:7000/api/"; //aws
  constructor(private http:HttpClient) { }

  getUserProfile(email)
  	{
  		return this.http.post(this.url+'get_user_profile',email)
  	}

  	updateProfile(data)
  	{
  		return this.http.post(this.url+'update_user_profile',data)
  	}
}
