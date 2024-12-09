import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(private http:HttpClient) { }

  public restaurantLogin(data:object):Observable<any>{
    return this.http.post('http://localhost:1050/restaurant/login', data);
  }
 public restaurantRegister(data:object):Observable<any>{
   return this.http.post('http://localhost:1050/restaurant/register',data)
 }
 public getRestaurantImage():Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/getRestaurantImage', { responseType: 'blob' })

}

public editRestaurant(data):Observable<any>{
  return this.http.put("http://localhost:1050/restaurant/updateRestaurantProfile",data)
}

public restaurantAddMenu(data):Observable<any>{
  return this.http.post("http://localhost:1050/restaurant/addFood",data)
}

public getFoodPictureById(data):Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/getFoodImage/'+data, { responseType: 'blob' })

}

public getFoodDetails():Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/getFoodDetails')

}
public getFoodByFoodId(id):Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/getFoodByFoodId/'+id)

}

public updateFood(data):Observable<any>{
  console.log("2")
  return this.http.put("http://localhost:1050/restaurant/updateFood",data)
}

public deleteFood(foodId):Observable<any>{
  return this.http.delete('http://localhost:1050/restaurant/deleteFood/'+foodId)

}
public restaurantOrders():Observable<any>{
  return this.http.get('http://localhost:1050/restaurant/getOrders')

}
public changeOrderStatus(orderId,changedStatus,detail):Observable<any>{
  return this.http.put(`http://localhost:1050/restaurant/changeOrderState/${orderId}/${changedStatus}`,detail)

}
}