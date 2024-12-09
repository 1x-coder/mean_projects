import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterUserComponent } from '../app/register-user/register-user.component'
import { HomeComponent } from  '../app/home/home.component'
import { LoginComponent } from './login/login.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';

const routes: Routes = [

{
  path: "",
  component: HomeComponent

},
{
  path: "home",
  component: HomeComponent
},
{
  path: "register",
  component: RegisterUserComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "favorites",
  component: MyFavoritesComponent
}

]



@NgModule({
  imports: [RouterModule.forRoot(routes,  { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
