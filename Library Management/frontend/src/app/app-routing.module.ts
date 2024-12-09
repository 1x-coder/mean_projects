import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ReaderComponent } from './reader/reader.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'citalac', component: ReaderComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'booksPage', component: BooksPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
