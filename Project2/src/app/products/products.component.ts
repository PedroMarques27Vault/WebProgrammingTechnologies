import { Component, OnInit } from '@angular/core';
import {Product} from "../Models/Product";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DRFService} from "../Services/drf.service";
import {Router} from "@angular/router";
import {User} from "../Models/User";
import {Promotion} from "../Models/Promotion";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products = Array<Product>();
  productForm: FormGroup | null = null;
  currentPromotion: Promotion | null = null;
  CATEGORY =['Smartphones','Computers','Tablets','Drones', 'Televisions']
  PROMOTIONS = Array<Promotion>();
  currentProduct: Product |null = null;
  selectedFile: string | ArrayBuffer | null = null;
  user: User | null = null;

  constructor( private formbuilder: FormBuilder,
               private service: DRFService,
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.createForm();


  }

  getProducts(): void{
    this.service.getProducts().subscribe((pr: Product[])=>
    {
      this.service.profile().subscribe((user:User)=>{
        this.user=user;
        this.createForm()
        if (this.user && !this.user.is_superuser){
          for(let p of pr){
            if(p.seller==this.user.username)
              this.products.push(p)
          }
        }
        else
          this.products = pr;
      })
      });

  }

  createForm(): void{
    this.service.profile().subscribe((user:User)=>{
      this.user=user;
      this.service.getPromotions().subscribe((promos: Promotion[])=>{
        this.PROMOTIONS = promos;
        this.productForm = new FormGroup({
          name: new FormControl('', [
            Validators.required
          ]),
          price: new FormControl('', [
            Validators.required,
            Validators.min(0)]),
          description: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          quantity: new FormControl('', [
            Validators.required,
            Validators.min(0)
          ]),
          image: new FormControl('', [
            Validators.required,
          ]),
          brand: new FormControl('', [
            Validators.required,
          ]),
          category:new FormControl('', [
            Validators.required,
          ]),
          condition:new FormControl('', [
            Validators.required,
          ]),
          promotion:new FormControl('', [
           ]),

        });
      });



  })
  }

  createUpdateForm(product: Product): void{
      this.currentProduct = product;
  }

  update():void{

      if (this.productForm  && this.selectedFile && this.currentProduct && this.user){

        let p = new Product(this.currentProduct.id, this.productForm.controls['name'].value,this.productForm.controls['price'].value,
          this.productForm.controls['description'].value, this.selectedFile,this.productForm.controls['quantity'].value,this.productForm.controls['brand'].value,
          this.currentProduct.seller, this.productForm.controls['category'].value, this.productForm.controls['condition'].value,
        )
        p.date = this.currentProduct.date
        if(this.productForm.controls['promotion'].value){
          p.promotion=this.productForm.controls['promotion'].value

        }


        this.service.updateProduct(p).subscribe((_)=>{
          alert('Product Updated')
          window.location.reload()
        });
      }


  }

  onFileChanged(event: any): void{
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.selectedFile = reader.result


      };

    }
  }

  create(): void{
    if (this.productForm && this.user && this.selectedFile){
      let username = this.user.username
      if (this.user.is_superuser)
        username = 'TechOn'
      let p = new Product(null, this.productForm.controls['name'].value,this.productForm.controls['price'].value,
        this.productForm.controls['description'].value, this.selectedFile,this.productForm.controls['quantity'].value,this.productForm.controls['brand'].value,
        username, this.productForm.controls['category'].value, this.productForm.controls['condition'].value,
        )
      if(this.productForm.controls['promotion'].value){
        p.promotion=this.productForm.controls['promotion'].value
      }


      this.service.createProduct(p).subscribe((_)=>{
        alert('Product Created')
        window.location.reload()
      });
    }

  }


  deleteProduct(productID: number | null): void {
    confirm('Are You Sure Yow Want To Delete This Product?')
    if (productID)
      this.service.deleteProduct(productID).subscribe((_)=>{
        window.location.reload()
      })

  }






}
