import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  loginToSystem(username, password){
    const data={
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/loginToSystem`, data);
  }


  
  checkUsername(username){
    const data={
      username: username
    }

    return this.http.post(`${this.uri}/users/checkUsername`, data);
  }

  checkEmail(email){
    const data={
      email: email
    }

    return this.http.post(`${this.uri}/users/checkEmail`, data);
  }


  
  updateInfo(username, name, lastName, address, contact, email, picture, oldUsername){
    const data={
      username: username,
      name: name,
      lastName: lastName,
      address: address,
      contact: contact,
      email: email,
      picture: picture,
      oldUsername: oldUsername
    }

    return this.http.post(`${this.uri}/users/updateInfo`, data);
  }


  
  changePassword(username, newPassword){
    const data={
      username: username,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/users/changePassword`, data);
  }



insertUser(username, password, name, lastName, address, contact, email, type, picture, blocked){
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
    blocked: blocked
  }

  return this.http.post(`${this.uri}/users/insertUser`, data);
}


incNumBook(username, howMuch){
  const data={
    username: username,
    howMuch: howMuch
  }

  return this.http.post(`${this.uri}/users/incNumBook`, data);
}


getAll(){
  return this.http.get(`${this.uri}/users/getAll`);
}




deleteUser(username){
  const data={
    username: username
  }

  return this.http.post(`${this.uri}/users/deleteUser`, data);
}


changePrivilegies(username, changeTo){
  const data={
    username: username,
    changeTo: changeTo

  }

  return this.http.post(`${this.uri}/users/changePrivilegies`, data);
}

blockOrUnblock(username, changeTo){
  const data={
    username: username,
    changeTo: changeTo

  }

  return this.http.post(`${this.uri}/users/blockOrUnblock`, data);
}





}
