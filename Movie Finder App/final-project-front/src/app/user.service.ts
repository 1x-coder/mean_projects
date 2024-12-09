import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApihandlerService } from "./apihandler.service"
import { convertToParamMap } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  favoriteButtonText = "Add to Favorites"

  // show modal
  showModal: boolean;
  

title: string;



  baseUrl: string = "http://localhost:3000/api/";
  //
  apiUrl: string = "https://api.themoviedb.org/3/"

  appUserUrl: string = "appUsers/";
  loginUrl: string = "appUsers/login";
  api_key: string = "109e006f232a954974d2a7a4d69190a6";
  genres: string = "genre/movie/list";
  searchPath: string = "search/company?";




isLoggedIn = false;


  url;


  firstName;

  sessionToken;
  userId;
  searchInput;
  searchResults= [];

// main display data flow
  movies = [];
  favorites = [];





  constructor(private _http: HttpClient, private _api: ApihandlerService) { }

  registerUser(userCredentials){
    return this._http.post(`${this.baseUrl}${this.appUserUrl}`, userCredentials);
  }


  loginUser(userCredentials){
    return this._http.post(`${this.baseUrl}${this.loginUrl}`, userCredentials)
  }

  settingsLogout(){
    this._api.settingsLogout().subscribe(
      (res: any) => {
        this.isLoggedIn = false
        alert("Logout Successful")
          window.location.reload();
      }
    )}






  searchMovies(){
    this.url = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&language=en-US&query=${this.searchInput}&page=1&include_adult=false`;
    this._http.get(this.url).subscribe(
      (res:any) => {
        console.log(res)
        this.movies = res.results
        this.checkFavorited()   
      })

  }




 

  
getTrending(){
  return this._api.getTrending().subscribe(
    ( res : any) => {
      this.movies = res.results
    console.log(res.results)
    this.title = "Trending Movies"
    this.checkFavorited()})
}


getPopular(){
  return this._api.getPopular().subscribe(
     ( res : any) => {
       this.movies = res.results
       console.log(res.results)
       this.title = "Popular Movies"  
       this.checkFavorited()
      })
 }
 
 getLatestMovies(){
   return this._api.getLatestMovies().subscribe(
     ( res : any) => {
       this.movies = res.results
       console.log(res.results)
       this.title = "Latest Movies"
       this.checkFavorited()
      })
     
 }
 
 getTopRated(){
   return this._api.getTopRated().subscribe(
     ( res : any) => {
       this.movies = res.results
       console.log(res.results)
       this.title = "Top Rated Movies"
       this.checkFavorited()
      })
 }
 
 getUpcoming(){
   return this._api.getUpcoming().subscribe(
     ( res : any) => {
       this.movies = res.results
       console.log(res.results)
       this.title="Upcoming Movies"
       this.checkFavorited()
     })
 }













addFavorite(movieInfo){
this._api.addFavorite(movieInfo).subscribe(
  (res : any) => {
    console.log(res)
    this.showFavorites()
  })
  
}

showFavorites(){
  this._api.showFavorites().subscribe(
    ( res : any) => {
      this.favorites = res
      console.log(res)
      this.checkFavorited()
    })
}







checkFavorited(){
for (let i = 0; i< this.movies.length; i++){
  for( let j = 0; j < this.favorites.length; j++){
    if (this.movies[i].id == this.favorites[j].movieID){
      this.movies[i].favorited = true;
      console.log("test")
    }
  }
}
 
}











}
