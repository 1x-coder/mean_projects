

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SysVariableServiceService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getExtendPeriod(){
    return this.http.get(`${this.uri}/sysService/getExtendPeriod`);
  }

  updateExtendPeriod(extendPeriod){
    const data={
      extendPeriod: extendPeriod
    }


    return this.http.post(`${this.uri}/sysService/updateExtendPeriod`, data);
  }



}


