import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Product} from "../Models/Product";
import {DRFService} from "../Services/drf.service";

import {User} from "../Models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../Models/Comment";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  allProducts = Array<Product>();
  products = Array<Product>();

  user: User|null = null;
  PRODUCTS = Array<Product>();
  commentForm: FormGroup | null = null;
  comments = Array<Comment>();

  constructor(private service: DRFService) {
  }

  ngOnInit(): void {
    this.getProducts();

    this.createForm();
    this.getComments();


  }
  getProducts(): void{
    this.service.getProducts().subscribe((pr: Product[])=>
    {
      this.products = pr;
      for (let i = 0; i < 4; i++) {

          this.allProducts.push(this.products[i])

      }

    })
  }

  addToCart(product: Product): void {
    if (product.id != null) {
      this.service.addToCart(product.id, 1).subscribe(() => {
        alert("Added 1 " + product.name + " to Cart")
      })
    }
  }
  getComments(): void{
    this.service.getAllComments().subscribe((c: Comment[])=>
    {
      this.comments = c;
    })
  }


  createForm(): void{
    this.service.profile().subscribe((pr: User)=> {
      this.user=pr;
      if (pr.is_superuser)
        AppComponent.isUserAdmin(true)
      this.service.getProducts().subscribe((products: Product[])=>{
        this.PRODUCTS = products;
        this.commentForm = new FormGroup({
          description: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          rating: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(5)]),

        });
      });
    });
  }

  create(): void{

    if (this.commentForm && this.user ){

      let c = new Comment(this.user.username, this.user.email, this.commentForm.controls['description'].value,this.commentForm.controls['rating'].value)

      this.service.createComment(c).subscribe((_)=>{
        alert("Comment Added")
        window.location.reload()
      })
    }

  }



}
