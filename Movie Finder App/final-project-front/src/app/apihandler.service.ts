import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApihandlerService {




  

  // properties //

  baseUrl: string = "http://localhost:3000/api/";
  apiUrl: string = "https://api.themoviedb.org/3/"
  api_key: string = "?api_key=109e006f232a954974d2a7a4d69190a6"
  results = [];

  movieInfo;


  constructor( private _http: HttpClient ) { }


// fix the creds in functions

getCreds(){
  let stateUserId = sessionStorage.getItem("userId")
  let accessToken = sessionStorage.getItem("token")
  return { accessToken, stateUserId }
  
}


  getTrending(){
    return this._http.get(`https://api.themoviedb.org/3/trending/all/day${this.api_key}`)
  }


 addFavorite(movieInfo){
   const creds = this.getCreds()
   return this._http.post(`${this.baseUrl}appUsers/${creds.stateUserId}/favorites?access_token=${creds.accessToken}`, movieInfo)
 }


 showFavorites(){
  const creds = this.getCreds()
   return this._http.get(`${this.baseUrl}appUsers/${creds.stateUserId}/favorites?access_token=${creds.accessToken}`)
 }


 getPopular(){
  return this._http.get(`${this.apiUrl}movie/popular${this.api_key}`)
 }


 getLatestMovies(){
   return this._http.get(`${this.apiUrl}movie/now_playing${this.api_key}`)
 }

 getTopRated(){
  return this._http.get(`${this.apiUrl}movie/top_rated${this.api_key}`)
}

getUpcoming(){
  return this._http.get(`${this.apiUrl}movie/upcoming${this.api_key}`)
}



createHeader() {
  return new HttpHeaders().set('Authorization', sessionStorage.getItem("token"));
}

settingsLogout(){
  const token = sessionStorage.getItem("token")
 return this._http.post(`${this.baseUrl}appUsers/logout?access_token=${token}`, {}, {headers: this.createHeader()})

 
}



}