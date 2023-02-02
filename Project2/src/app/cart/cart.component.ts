import { Component, OnInit } from '@angular/core';
import {Product} from "../Models/Product";
import {DRFService} from "../Services/drf.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart=new Map<Product,any>();
  total = 0;
  subtotal=0;
  discount = 0;
  credits = 0;
  cardNo: string | null = '**** **** **** ****';

  checkoutForm: FormGroup | null = null;


  constructor(private service: DRFService) {

  }

  ngOnInit(): void {
    this.createForm()
    this.getCart()

  }
  createForm(): void{
    this.service.credits().subscribe((creds: number)=>
    {
      this.credits = creds;

      if (localStorage.getItem('CARD_NO')){
        this.cardNo = localStorage.getItem('CARD_NO')
      }
      this.service.getCartTotal().subscribe((total:number)=>{
        this.total=total
        this.checkoutForm = new FormGroup({
          cardno: new FormControl('', [
            Validators.required,
            Validators.minLength(16),
            Validators.maxLength(16),
            Validators.min(0)
          ]),
          type: new FormControl('', [
            Validators.required,
          ]),
          code: new FormControl('',[
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.min(0)
          ] ),
          year: new FormControl('',
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(4),
              Validators.min(1900),

            ]),
          month: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(12)
          ]),
          address: new FormControl('',
            [
              Validators.required,
            ]),
          credits: new FormControl('', [
            Validators.required,
            Validators.min(0),
            Validators.max(creds),
            Validators.max(this.total)
          ]),

        });

      })

    });

  }
  getCart(): void{
    this.cart=new Map<Product,any>();
    this.discount=0;
    this.total=0;
    this.subtotal=0;
    this.service.getCart().subscribe((cart: string)=>
    {
      cart = (JSON.stringify(cart))
      let minus = cart.replace("{","").replace("}","")
      let cartItems = minus.split(",")

      for (let c of cartItems) {
        var re = /"/gi;
        c = c.replace(re, "")
        var key = String(c.split(":")[0])
        var value = c.split(":")[1]
        this.service.getProduct(Number(key)).subscribe((product: Product)=>
        {
          this.cart.set(product, Number(value))
          if(product.promotion){
            this.discount+=product.price * product.promotion.discount
          }
          this.subtotal+=product.price;
        });
      }
    });
  }

  getTotal():void{
    this.service.getCartTotal().subscribe((cartTotal: number)=>
    {
      this.total=cartTotal;
    });
  }
  addToCart(product: Product): void{
    if (product.id != null) {
      this.service.addToCart(product.id, 0).subscribe(() => {
        alert("Removed From Cart")
        this.getCart()
        this.getTotal()

      })
    }
  }
  checkout(): void{
    if(this.checkoutForm){
      let cardno = this.checkoutForm.controls['cardno'].value
      this.service.checkout(this.checkoutForm.controls['address'].value, this.total, this.checkoutForm.controls['credits'].value,
        cardno, this.checkoutForm.controls['type'].value).subscribe(()=>{
        localStorage.setItem('CARD_NO',  cardno);
        window.location.reload();

      })

    }

  }
}
