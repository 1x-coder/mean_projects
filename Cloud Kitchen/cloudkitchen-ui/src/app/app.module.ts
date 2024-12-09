import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent,NgbdModalContent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRestaurantsComponent } from './admin-restaurants/admin-restaurants.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminDeliveryPersonsComponent } from './admin-delivery-persons/admin-delivery-persons.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerHotelDetailsComponent } from './customer-hotel-details/customer-hotel-details.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { CustomerViewOrdersComponent } from './customer-view-orders/customer-view-orders.component';
import { CustomerEditProfileComponent } from './customer-edit-profile/customer-edit-profile.component';
import { RestaurantHomeComponent } from './restaurant-home/restaurant-home.component';
import { RestaurantLoginComponent } from './restaurant-login/restaurant-login.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';
import { RestaurantAddMenuComponent } from './restaurant-add-menu/restaurant-add-menu.component';
import { RestaurantEditMenuComponent } from './restaurant-edit-menu/restaurant-edit-menu.component';
import { RestaurantViewRestaurantProfileComponent } from './restaurant-view-restaurant-profile/restaurant-view-restaurant-profile.component';
import { RestaurantEditRestaurantProfileComponent } from './restaurant-edit-restaurant-profile/restaurant-edit-restaurant-profile.component';
import { RestaurantAmbienceComponent } from './restaurant-ambience/restaurant-ambience.component';
import { RestaurantManageOrderComponent } from './restaurant-manage-order/restaurant-manage-order.component';
import { DeliveryPersonLoginComponent } from './delivery-person-login/delivery-person-login/delivery-person-login.component';
import { DeliveryPersonRegisterComponent } from './delivery-person-register/delivery-person-register/delivery-person-register.component';
import { DeliveryPersonViewOrdersComponent } from './delivery-person-view-orders/delivery-person-view-orders/delivery-person-view-orders.component';
import { DeliveryPersonViewPenaltiesComponent } from './delivery-person-view-penalties/delivery-person-view-penalties/delivery-person-view-penalties.component';
import { DeliveryPersonUpdateProfileComponent } from './delivery-person-update-profile/delivery-person-update-profile/delivery-person-update-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogRegDpComponent } from './delivery-person-register/dialog/dialog-reg-dp/dialog-reg-dp.component';
import { DialogLoginComponent } from './delivery-person-login/dialog-login/dialog-login.component';
import { ConfirmDialogComponent } from './customer-cart/confirm-dialog/confirm-dialog.component';
import { RestaurantViewFoodComponent } from './restaurant-view-food/restaurant-view-food.component';
import { DeliveryPersonViewProfileComponent } from './delivery-person-view-profile/delivery-person-view-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminOrdersComponent,
    AdminRestaurantsComponent,
    AdminCustomersComponent,
    AdminDeliveryPersonsComponent,
    CustomerHomeComponent,
    CustomerLoginComponent,
    CustomerRegisterComponent,
    CustomerHotelDetailsComponent,
    CustomerCartComponent,
    CustomerViewProfileComponent,
    CustomerViewOrdersComponent,
    CustomerEditProfileComponent,
    RestaurantHomeComponent,
    RestaurantLoginComponent,
    RestaurantRegisterComponent,
    RestaurantAddMenuComponent,
    RestaurantEditMenuComponent,
    RestaurantViewRestaurantProfileComponent,
    RestaurantEditRestaurantProfileComponent,
    RestaurantAmbienceComponent,
    RestaurantManageOrderComponent,
    DeliveryPersonLoginComponent,
    DeliveryPersonRegisterComponent,
    DeliveryPersonViewOrdersComponent,
    DeliveryPersonViewPenaltiesComponent,
    DeliveryPersonUpdateProfileComponent,
    DialogRegDpComponent,
    DialogLoginComponent,
    NgbdModalContent,
    ConfirmDialogComponent,
    RestaurantViewFoodComponent,
    DeliveryPersonViewProfileComponent,
  ],
  entryComponents: [DialogRegDpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],


})
export class AppModule { }
