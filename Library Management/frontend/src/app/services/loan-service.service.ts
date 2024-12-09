
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {

  constructor(private http: HttpClient) { }
  uri='http://localhost:4000'


  


  getAll(username, wantReturned){

    const data={
      username: username,
      wantReturned: wantReturned
    }


    return this.http.post(`${this.uri}/loan/getAll`, data);
  }

  

  getAllFromAllUsers(){

    return this.http.get(`${this.uri}/loan/getAllFromAllUsers`);
  }

  getAllForOneBook(idBook, wantReturned){

    const data={
      idBook: idBook,
      wantReturned: wantReturned
    }


    return this.http.post(`${this.uri}/loan/getAllForOneBook`, data);
  }


  extendDate(idLoan, deadLine){
    const data={
      idLoan: idLoan,
      deadLine: deadLine
    }


    return this.http.post(`${this.uri}/loan/extendDate`, data);
  }



  
  checkIfUserTookBook(username, idBook){

    const data={
      username: username,
      idBook: idBook
    }


    return this.http.post(`${this.uri}/loan/checkIfUserTookBook`, data);
  }

  
  insertLoan(idLoan, idBook, title, deadLine, username, writer, loanDate, picture){
    const data={
      idLoan: idLoan,
      idBook: idBook,
      title: title,
      deadLine: deadLine,
      username: username,
      writer: writer,
      loanDate: loanDate,
      picture: picture
    }

    return this.http.post(`${this.uri}/loan/insertLoan`, data);
  }

  getAllBookAndUsername(username, idBook){

    const data={
      username: username,
      idBook: idBook
    }


    return this.http.post(`${this.uri}/loan/getAllBookAndUsername`, data);
  }

  
  
  updateReturnedDateAndBook(idLoan, returnDate, returnBook){
    const data={
      idLoan: idLoan,
      returnDate: returnDate,
      returnBook: returnBook
    }

    return this.http.post(`${this.uri}/loan/updateReturnedDateAndBook`, data);
  }



}


