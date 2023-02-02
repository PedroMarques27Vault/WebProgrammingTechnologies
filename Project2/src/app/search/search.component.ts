import { Component, OnInit } from '@angular/core';
import {Product} from "../Models/Product";
import {DRFService} from "../Services/drf.service";
import {min} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  allProducts = Array<Product>();
  promotions = Array<string>();
  products = Array<Product>()
  //Filters


  CATEGORIES = Array<string>("All");
  SELLERS = Array<string>("All");
  CONDITIONS = ["All","New", "Used"];
  BRANDS = Array<string>("All");
  STOCK = ["True", "False", "All"];
  PROMO = ["True", "False", "All"];
  ITEMS = Array<string>("");

  condition="All";
  category = "All";
  brand="All";
  seller="All";
  query = new FormControl("");
  minPrice = new FormControl("", [Validators.min(0)]);
  maxPrice = new FormControl("",Validators.min(0));
  priceRange =[0,20000];
  inStock = "All";
  inPromotion="All";


  constructor(private service: DRFService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  addToCart(product: Product): void{
    if (product.id != null) {
      this.service.addToCart(product.id, 1).subscribe(()=>{
        alert("Added 1 " +product.name +" to Cart")
      })
    }
  }


  searchRemoveAll(): void {
    let filters = new Map();
    filters.set('query',this.query.value);
    filters.set('brands', this.brand)
    filters.set('price', this.priceRange)
    filters.set('categories', this.category)
    filters.set('sellers', this.seller)
    filters.set('condition', this.condition)
    filters.set('inStock', this.inStock)
    filters.set('inPromotion', this.inPromotion)
    this.service.search(filters).subscribe((pr: Product[])=>
    {
      this.products = pr;
    });
  }

  getProducts(): void{
    this.service.getProducts().subscribe((pr: Product[])=>
    {
      this.allProducts = pr;
      this.products = pr;
      for (let i = 0; i < this.products.length; i++) {
        if(this.products[i].promotion!=null){
          this.promotions.push(this.products[i].promotion.name)
        }
      }

      this.getFilters();
    })
  }


  getFilters(): void{
    let minPrice = 0
    this.allProducts.forEach((value) =>{
        if (value.price>minPrice) minPrice = value.price;
        if (!this.SELLERS.includes(value.seller)) {this.SELLERS.push(value.seller)}
        if (!this.CATEGORIES.includes(value.category)) {this.CATEGORIES.push(value.category)}
        if (!this.BRANDS.includes(value.brand)) {this.BRANDS.push(value.brand)}
        if (!this.ITEMS.includes(value.name)){this.ITEMS.push(value.name)}
    })
    this.priceRange = [0, minPrice];
  }

}
