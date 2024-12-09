import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestsServiceService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  insertRequest(username, password, name, lastName, address, contact, email, type, picture, status){
    const data={
      username: username,
      password: password,
      name: name,
      lastName: lastName,
      address: address,
      contact: contact,
      email: email,
      type: type,
      picture: picture,
      status: status
    }

    return this.http.post(`${this.uri}/requests/insertRequest`, data);
  }


  getAll(){
    return this.http.get(`${this.uri}/requests/getAll`);
  }

  
  setStatus(status, username){
    const data={
      status: status,
      username: username
    }

    return this.http.post(`${this.uri}/requests/setStatus`, data);
  }

  



}


