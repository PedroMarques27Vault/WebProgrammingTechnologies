import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/User";
import {DRFService} from "../Services/drf.service";
import {Router} from "@angular/router";
import {Comment} from "../Models/Comment";
import {Promotion} from "../Models/Promotion";
import {Product} from "../Models/Product";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments = Array<Comment>();
  commentForm: FormGroup | null = null;
  user: User|null = null;
  PRODUCTS = Array<Product>();

  constructor(private formbuilder: FormBuilder,
              private service: DRFService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getComments();
    this.createForm();
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
        product:new FormControl('', [
        ]),
      });
    });
    });
  }

  create():void{
    if(this.user && this.commentForm){
      let c = new Comment(this.user.username, this.user.email, this.commentForm.controls['description'].value, this.commentForm.controls['rating'].value)


      if(this.commentForm.controls['product'].value){
        c.product=this.commentForm.controls['product'].value
  
      }

      this.service.createComment(c).subscribe((_)=>{
        alert("Comment Added")
        window.location.reload()
      })
    }
  }

  deleteComment(commentID: number | null): void {

    if (commentID && confirm('Are You Sure Yow Want To Delete This Comment?'))
      this.service.deleteComment(commentID).subscribe((_)=>{
        window.location.reload()
      })

  }


}
