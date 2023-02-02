import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {DRFService} from "./Services/drf.service";
import { ProductDetailsComponent } from './product-details/product-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocomplete} from "@angular/material/autocomplete";
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CommentsComponent } from './comments/comments.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SoldComponent } from './sold/sold.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProfileComponent,
    ProductDetailsComponent,
    LoginComponent,
    CartComponent,
    ProductsComponent,
    PromotionsComponent,
    CommentsComponent,
    UsersComponent,
    HomeComponent,
    SoldComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    NgbCarouselModule,

  ],
  providers: [DRFService],
  bootstrap: [AppComponent]
})
export class AppModule { }
