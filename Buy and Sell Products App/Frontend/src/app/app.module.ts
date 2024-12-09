import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule}  from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule,MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
// import { InputModule } from 'voice-to-text';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatreqComponent } from './pages/chatreq/chatreq.component';
import { LaptopsComponent } from './pages/forms/laptops/laptops.component';
import { BooksComponent } from './pages/forms/books/books.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CarsComponent,
    BikesComponent,
    MobilesComponent,
    PreviewComponent,
    FooterComponent,
    MyadsComponent,
    ProfileComponent,
    ChatComponent,
    ChatreqComponent,
    LaptopsComponent,
    BooksComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
