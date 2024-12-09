import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
url= "http://localhost:7000/api/";
// url= "http://54.180.142.192:7000/api/"; //aws
  constructor(private http:HttpClient) { }

  postcar(data)
  	{
  		return this.http.post(this.url+'post_car_bike',data)
  	}


  getCar_Bikes()
  	{
  		return this.http.get(this.url+'get_car_bikes')
  	}

 
    countLikes(likesData)
    {
      return this.http.post(this.url+'count_likes',likesData);
    }
}
