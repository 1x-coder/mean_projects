import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserServiceService, 
    private mainRouter: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }



  username: string;
  password: string;
  error: string;

  logInToSystem(){
    this.userService.loginToSystem(this.username, this.password).
    subscribe((logginUser: User)=>{
      if(logginUser){
        localStorage.setItem('loggedUser', JSON.stringify(logginUser));
        if(logginUser.type=='citalac'){
          this.error = "Greska, pokusavate kao citalac da se prijavite preko privatnog linka za admine"
        }
        else if(logginUser.type == "moderator"){
          this.error = "Greska, pokusavate kao moderator da se prijavite preko privatnog linka za admine"
        }
        else if(logginUser.type == "admin"){
          this.mainRouter.navigate(['admin']);
        }
        else{
          this.error = 'Greska, username i password su u redu, ali tip korisnika ne postoji'
        }
      }
      else{
        this.error = 'Greska, pogresno korisnicko ime ili lozinka, pokusajte ponovo'
      }
      
    })
  }



}
