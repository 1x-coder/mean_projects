
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { UserService } from "../user.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  //modal state
  basic: boolean;
  movieActive= {};



  notFavorited = true;


url: string = "https://api.themoviedb.org/3/trending/movie/week?api_key=109e006f232a954974d2a7a4d69190a6";
movies: any = [];
searchResults = [];


searchInput = this._userService.searchInput;


//bad
userId = sessionStorage.getItem("userId")


movieInfo = {
  movieTitle: null,
  movieID: null,
  userId: this.userId,
}








  constructor(private _http: HttpClient, public _userService: UserService, private elementRef: ElementRef) { }




// change check favorites functionality to login function

  ngOnInit() {
    console.log("on init ran")
    this._http.get(this.url).subscribe(
      (res:any) => {
        console.log(res.results)
        this._userService.movies = res.results
         })
      this._userService.showFavorites()
      this._userService.checkFavorited()
      
        //  window.location.reload();
        
       
  }


  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }



  // reloadHome(){
  //   if (this.router && this.router.url === '/home') {
  //   window.location.reload();
  // } else {
  //   this.router.navigate(['/home']);
  // }
  // }



addFavorite(movieTitle, movieId) {
  if (this._userService.isLoggedIn === false) {
    return alert("You are not logged in.")
  }

  
  this.movieInfo.movieTitle = movieTitle;
  this.movieInfo.movieID = movieId;
  this._userService.addFavorite(this.movieInfo)
 
  this._userService.checkFavorited()
  
}





openModal(param){
  let poster = "https://image.tmdb.org/t/p/w300/" + param.poster_path;
  this.movieActive = {...param, poster};
 
  

  if (this.basic === true){
    return this.basic = false
    
  }
  this.basic = true;
  console.log(this.movieActive)
  }






}
