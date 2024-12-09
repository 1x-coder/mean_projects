


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  getBookById(idBook){

    const data={
      idBook: idBook
    }


    return this.http.post(`${this.uri}/books/getBookById`, data);
  }


  
  updateAmount(idBook, howMuch){
    const data={
      idBook: idBook,
      howMuch: howMuch
    }

    return this.http.post(`${this.uri}/books/updateAmount`, data);
  }



  
  updateTimesTaken(idBook, howMuch){
    const data={
      idBook: idBook,
      howMuch: howMuch
    }

    return this.http.post(`${this.uri}/books/updateTimesTaken`, data);
  }


  getAll(){

    return this.http.get(`${this.uri}/books/getAll`);
  }

  

    insertBook(idBook, title, writer, genre, publisher, pubYear, language, picture){
      const data={
        idBook: idBook,
        title: title,
        writer: writer,
        genre: genre,
        publisher: publisher,
        pubYear: pubYear,
        language: language,
        picture: picture
      }
  
      return this.http.post(`${this.uri}/books/insertBook`, data);
    } 

  updateBook(idBook, title, writer, genre, publisher, pubYear, language, picture, amount){
    const data={
      idBook: idBook,
      title: title,
      writer: writer,
      genre: genre,
      publisher: publisher,
      pubYear: pubYear,
      language: language,
      picture: picture,
      amount: amount
    }

    return this.http.post(`${this.uri}/books/updateBook`, data);
  }


  
  deleteBook(idBook){
    const data = {
      idBook: idBook
    }

    return this.http.post(`${this.uri}/books/deleteBook`, data)
  }

  
updateRating(idBook, howMuch){
  const data={
    idBook: idBook,
    howMuch: howMuch
  }

  return this.http.post(`${this.uri}/books/updateRating`, data);
}

}
