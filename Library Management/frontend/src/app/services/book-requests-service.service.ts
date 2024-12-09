

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookRequestsServiceService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getAll(){

    return this.http.get(`${this.uri}/bookRequests/getAll`);
  }

  insertRequest(idBookRequest, username, title, writer, genre, publisher, pubYear, language, picture){
    const data={
      idBookRequest: idBookRequest,
      username: username,
      title: title,
      writer: writer,
      genre: genre,
      publisher: publisher,
      pubYear: pubYear,
      language: language,
      picture: picture
    }

    return this.http.post(`${this.uri}/bookRequests/insertRequest`, data);
  }

  delete(idBookRequest){
    const data = {
      idBookRequest: idBookRequest
    }

    return this.http.post(`${this.uri}/bookRequests/delete`, data)
  }



}
