import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  aLogin='http://localhost:1050/admin/login';
  orders='http://localhost:1050/admin/order';
  custs='http://localhost:1050/admin/customer';
  rests='http://localhost:1050/admin/restaurant';
  delpers='http://localhost:1050/admin/delper';
  upOrders='http://localhost:1050/admin/updateOrderStatus';
  constructor(private http: HttpClient) { }
  adminLogin(cred): Observable<any> {
    return this.http.post<Observable<any>>(this.aLogin, cred);
  }
  order():Observable<any>{
      return this.http.get<Observable<any>>(this.orders);
  }
  cust():Observable<any> {
      return this.http.get<Observable<any>>(this.custs);
  }
  rest():Observable<any> {
    return this.http.get<Observable<any>>(this.rests);
}
  delper():Observable<any> {
    return this.http.get<Observable<any>>(this.delpers);
}
  upOrder(oId,status): Observable<any> {
    return this.http.put<Observable<any>>(this.upOrders+"/"+oId, status);
  }
  delcust(cId): Observable<any> {
    return this.http.delete<Observable<any>>(this.custs+'/'+cId);
  }
  delrest(rId): Observable<any> {
    return this.http.delete<Observable<any>>(this.rests +'/'+rId);
  }
  deldelper(dId): Observable<any> {
    return this.http.delete<Observable<any>>(this.delpers+'/'+dId);
  }
}
