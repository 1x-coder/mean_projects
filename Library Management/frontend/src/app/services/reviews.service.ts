import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getAll(idBook){

    const data={
      idBook: idBook
    }
    return this.http.post(`${this.uri}/review/getAll`, data);

}

getAllFromAllUsers(){


  return this.http.get(`${this.uri}/review/getAllFromAllUsers`);

}



insertReview(idReview, username, rating, idBook, comment, date, edited){
  const data={
    idReview: idReview,
    username: username,
    rating: rating,
    idBook: idBook,
    comment: comment,
    date: date,
    edited: edited
  }

  return this.http.post(`${this.uri}/review/insertReview`, data);
} 


updateReview(idReview, rating, comment, date, edited){
  const data={
    idReview: idReview,
    rating: rating,
    comment: comment,
    date: date,
    edited: edited
  }

  return this.http.post(`${this.uri}/review/updateReview`, data);
} 



}


