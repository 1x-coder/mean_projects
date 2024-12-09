import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonServiceService {

  constructor(private http: HttpClient) { }

  public registerDeliveryPerson(data: Object): Observable<any> {
    return this.http.post('http://localhost:1050/deliveryperson/register', data)
  }

  public loginDeliveryPerson(data: Object): Observable<any> {
    return this.http.post('http://localhost:1050/deliveryperson/login', data);
  }

  public getOrders(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token')
    });
    return this.http.get('http://localhost:1050/deliveryperson/getAllOrders', { headers: httpHeaders })
  }

  public pickupOrder(oId): Observable<any> {
    return this.http.put<Observable<any>>('http://localhost:1050/deliveryperson/pickOrder/' , {orderId : oId});
  }

  public deliverOrder(oId): Observable<any> {
    return this.http.put<Observable<any>>('http://localhost:1050/deliveryperson/deliverOrder/' , {orderId : oId});
  }

  public cancelOrder(oId): Observable<any> {
    return this.http.put<Observable<any>>('http://localhost:1050/deliveryperson/cancelOrderPickup/' , {orderId : oId});
  }

  public getProfilePicture(): Observable<Blob>{
    return this.http.get('http://localhost:1050/deliveryperson/getProfileImage/', { responseType: 'blob' });
  }

  public updateProfile(updatedDetails): Observable<any>{
    return this.http.put<Observable<any>>('http://localhost:1050/deliveryperson/updateDetails', updatedDetails);
  }

  public pen(): Observable<any>{
    return this.http.get<Observable<any>>('http://localhost:1050/deliveryperson/getAllPenalties');
  }

  public upen(pId): Observable<any>{
    console.log(pId);
    
    return this.http.put<Observable<any>>('http://localhost:1050/deliveryperson/payPenalty',{pId:pId});
  }

}
