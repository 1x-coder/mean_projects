import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


form = {
  email: null,
  password: null,
}



  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }



  logIn() {
    this._userService.loginUser(this.form).subscribe( (res: any)=> {
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('userId', res.userId);
      this._userService.firstName = res.firstName;
      this._userService.isLoggedIn = true;
// log user ID
      this._userService.sessionToken = res.token;
      this.backHome();
      
     this._userService.isLoggedIn = true
    })
    alert("Success!")
  }


    backHome() {
      this._router.navigate(['/home']);
        
  }

    
  // reloadHome(){
  //   window.location.reload();
  // }


  
// reloadHome1(){
//   this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//     this._router.navigate(['/home']);
// });
// } 




  
}
