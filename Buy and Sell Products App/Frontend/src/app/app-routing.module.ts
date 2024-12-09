import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { CarsComponent } from './pages/forms/cars/cars.component';
import { BikesComponent } from './pages/forms/bikes/bikes.component';
import { MobilesComponent } from './pages/forms/mobiles/mobiles.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MyadsComponent } from './pages/myads/myads.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatreqComponent } from './pages/chatreq/chatreq.component';
import { LaptopsComponent } from './pages/forms/laptops/laptops.component';
import { BooksComponent } from './pages/forms/books/books.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [

{path:'',component:HomeComponent , children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'',component:MainComponent},
    {path:'cars',component:CarsComponent},
    {path:'bikes',component:BikesComponent},
    {path:'mobiles',component:MobilesComponent},
    {path:'preview/:pid',component:PreviewComponent},
    {path:'myads',component:MyadsComponent},
    {path:'profile',component:ProfileComponent},
    {path:'chat/:email',component:ChatComponent},
    {path:'chatreq',component:ChatreqComponent},
    {path:'laptops',component:LaptopsComponent},
    {path:'books',component:BooksComponent},
    {path:'search',component:SearchComponent}
]},
{path:'footer',component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
