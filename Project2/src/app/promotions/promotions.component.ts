import { Component, OnInit } from '@angular/core';
import {DRFService} from "../Services/drf.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Promotion} from "../Models/Promotion";
import {User} from "../Models/User";
import {Router} from "@angular/router";
import {Product} from "../Models/Product";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  promotions = Array<Promotion>();
  promotionForm: FormGroup | null = null;
  user: User|null = null;
  updateForm: FormGroup | null = null;
  currentPromotion: Promotion |null = null;

  constructor(private formbuilder: FormBuilder,
              private service: DRFService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getPromotions();
    this.createForm();

  }

  getPromotions(): void{
    this.service.getPromotions().subscribe((pr: Promotion[])=>
    {
      this.promotions = pr;
    })
  }

  createForm(): void{
    this.service.profile().subscribe((pr: User)=> {
      this.user=pr;
      this.promotionForm = new FormGroup({
        name: new FormControl('', [
          Validators.required
        ]),
        discount: new FormControl('', [
          Validators.required,
          Validators.min(0),
          Validators.max(1)]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),deadline: new FormControl('', [
          Validators.required,
        ]),
      });
    });
  }

  create(): void{

    if (this.promotionForm && this.user ){
      let p = new Promotion(null, this.promotionForm.controls['name'].value, this.promotionForm.controls['discount'].value, this.promotionForm.controls['description'].value, this.promotionForm.controls['deadline'].value)
      this.service.createPromotion(p).subscribe((_)=>{
        alert('Promotion Created')
        window.location.reload()

      });
    }

  }

  deleteProduct(promotionID: number | null): void {
    confirm('Are You Sure Yow Want To Delete This Promotion?')
    if (promotionID)
      this.service.deletePromotion(promotionID).subscribe((_)=>{
        window.location.reload()
      })

  }

  createUpdateForm(promotion: Promotion): void{
    this.currentPromotion = promotion;
  }

  update():void{


    if (this.promotionForm && this.user && this.currentPromotion){
      let p = new Promotion(this.currentPromotion.id, this.promotionForm.controls['name'].value, this.promotionForm.controls['discount'].value, this.promotionForm.controls['description'].value)

      this.service.updatePromotion(p).subscribe((_)=>{
        alert('Promotion Updated')
      });
    }
  }




}
