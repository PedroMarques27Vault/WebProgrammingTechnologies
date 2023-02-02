import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from "./search/search.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {ProductsComponent} from "./products/products.component";
import {PromotionsComponent} from "./promotions/promotions.component";
import {CommentsComponent} from "./comments/comments.component";
import {UsersComponent} from "./users/users.component";
import {HomeComponent} from "./home/home.component";

import {RegisterComponent} from "./register/register.component";
import {SoldComponent} from "./sold/sold.component";



const routes: Routes = [
  {path: 'shop', component: SearchComponent},
  {path: 'account', component: ProfileComponent},
  {path: 'details/:id', component: ProductDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sold', component: SoldComponent},


];


@NgModule({
  exports:[
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
