import { Component, OnInit } from '@angular/core';
import {DRFService} from "../Services/drf.service";
import {Router} from "@angular/router";
import {User} from "../Models/User";
import {Product} from "../Models/Product";
import {ShoppingCart} from "../Models/ShoppingCart";
import {Payment} from "../Models/Payment";
import {ShoppingCartItem} from "../Models/ShoppingCartItem";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  credits = 0;
  email='';
  password='';
  scarts = new Map<Payment, Array<ShoppingCartItem>>();
  profileForm: FormGroup | null = null;
  constructor(private service: DRFService, private router: Router) {


  }

  ngOnInit(): void {
    if (!localStorage.getItem("TOKEN")){
      this.router.navigate(['/login']);
    }else{
      this.getUser();

    }

  }
  getUser(): void{
    this.service.profile().subscribe((pr: User)=>
    {
      this.user = pr;
      this.service.credits().subscribe((cr: number)=>{
        this.credits = cr;
        this.createForm();
        this.email=pr.email;
      })

      this.getBought()
    })
  }
  save(): void{

    if(this.profileForm && this.user && this.user.id){
      this.service.updateUser(this.user.username, this.profileForm.controls['email'].value,  this.profileForm.controls['password'].value, this.user.id).subscribe(()=>{
        window.location.reload();
      })

    }
  }
  delete(): void{
    let a = confirm("Do You Really Wish To Delete Your Account?")
    if(a && this.user && this.user.id){
      this.service.deleteAccount(this.user.id).subscribe((_)=>{
        localStorage.clear();
        this.router.navigate(['/login']);
      })
    }

  }
  createForm(): void{
      this.profileForm = new FormGroup({
        email: new FormControl('', [
          Validators.required,
        ]),
        password: new FormControl('', [
          Validators.required,
        ]),
      });
  }
  getBought(): void{
    if (this.user){
      this.service.getShoppingCarts(this.user.username).subscribe((scarts : Payment[])=>{
        for (let c of scarts){
          if (c.shopping_cart.id != null) {
            this.service.getShoppingCartItems(c.shopping_cart.id).subscribe((products: ShoppingCartItem[])=>{
              this.scarts.set(c, products);
            });
          }
        }

      })
    }

  }
}
