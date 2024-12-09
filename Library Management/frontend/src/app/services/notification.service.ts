import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getAll(){

    return this.http.get(`${this.uri}/notification/getAll`);

  }

  
  insertNotification(idNotification, username, text, always){
    const data={
      idNotification: idNotification,
      username: username,
      text: text,
      always: always
    }

    return this.http.post(`${this.uri}/notification/insertNotification`, data);
  }

    getForUser(username){

      const data={
        username: username
      }
  
  
      return this.http.post(`${this.uri}/notification/getForUser`, data);
    }

    
  deleteNotification(idNotification){
    const data = {
      idNotification: idNotification
    }

    return this.http.post(`${this.uri}/notification/deleteNotification`, data)
  }



}


