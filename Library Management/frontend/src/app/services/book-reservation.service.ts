import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookReservationService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getAll(){

    return this.http.get(`${this.uri}/bookReservations/getAll`);
  }

  insertReservation(username, idBookReservation, idBook){
    const data={
      username: username,
      idBookReservation: idBookReservation,
      idBook: idBook
    }

    return this.http.post(`${this.uri}/bookReservations/insertReservation`, data);
  }

  
  getAllForOneBook(idBook){
    const data={
      idBook: idBook
    }

    return this.http.post(`${this.uri}/bookReservations/getAllForOneBook`, data);
  }

  deleteReservation(idBookReservation){
    const data={
      idBookReservation: idBookReservation
    }

    return this.http.post(`${this.uri}/bookReservations/deleteReservation`, data);
  }

  
}
