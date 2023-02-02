import { Component, OnInit } from '@angular/core';
import {Product} from "../Models/Product";
import {Comment} from "../Models/Comment";
import {DRFService} from "../Services/drf.service";
import {ActivatedRoute, Params} from "@angular/router";
import {identity} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/User";
import {AppComponent} from "../app.component";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = Product.newProduct();
  stars: any[] = [];
  avgRating: number = 0;
  user: User | null = null;
  commentForm: FormGroup | null = null;
  id: string = '';
  sum: number = 0;
  comments= Array<Comment>();
  quantity= new FormControl('', Validators.min(0));

  constructor(private route: ActivatedRoute, private service: DRFService ) {

  }
  addToCart(): void{
    if (this.product &&this.product.id)
      this.service.addToCart(this.product.id, this.quantity.value).subscribe((_)=>{
        alert(this.quantity.value +" "+this.product.name + " are in cart now")
    })
  }

  ngOnInit(): void {
    this.id = window.location.href.split("details/")[1];

    this.getProduct(this.id);
    this.getComments(this.id)
    this.createForm();

  }

  createForm(): void{
    this.service.profile().subscribe((pr: User)=> {
      this.user=pr;
      if (pr.is_superuser)
        AppComponent.isUserAdmin(true)
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
  }

  getProduct(id:string|null): void{
    this.service.getProduct(Number(id)).subscribe((pr: Product)=>
    {
      this.product = pr;
    })
  }

  getComments(id: string|null): void{
    this.service.getComments(Number(id)).subscribe((c:Comment[]) =>{
      this.comments = c;
      this.comments.forEach((value) =>{
          this.sum += value.rating;
      })
      if (this.sum>0)
        this.avgRating = this.sum / this.comments.length;
      for(let i=0; i < this.avgRating ; i++){
        this.stars.push(1);
      }
      if (this.stars.length<this.avgRating){
        this.stars.push(0);
      }
    })
  }
  create():void{
      if(this.user && this.commentForm){
        let c = new Comment(this.user.username, this.user.email, this.commentForm.controls['description'].value, this.commentForm.controls['rating'].value)
        c.product=this.product;


        this.service.createComment(c).subscribe((_)=>{
          alert("Comment Added")
          window.location.reload()
        })
      }


  }
}
