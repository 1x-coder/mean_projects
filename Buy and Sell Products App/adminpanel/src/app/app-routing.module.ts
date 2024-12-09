import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { CategoryComponent } from './pages/dashboard/category/category.component';
import { AddcategoryComponent } from './pages/dashboard/addcategory/addcategory.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'dashboard',component:DashboardComponent, children:[
        {path:'',component:HomeComponent},
        {path:'category',component:CategoryComponent},
        {path:'addcategory',component:AddcategoryComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
