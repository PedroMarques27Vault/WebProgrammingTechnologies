import {Promotion} from "./Promotion";

export class Product {
  static CONDITIONS = ["New","Used"]
  private BASE_URL = 'http://localhost:8000/';
  id: number | null;
  name: string;
  price: number;
  description: string;
  stock: boolean = false;
  image: string | ArrayBuffer;
  quantity: number;
  brand: string;
  seller: string = '';
  category : string = '';
  promotion : Promotion  = new Promotion(null, '', 0, '');
  date: Date = new Date();
  condition: string = '';
  toString(): string {
    return this.name ;
  }

  constructor(id: number | null, name: string, price: number, description: string, image: string | ArrayBuffer, quantity: number, brand: string, seller: string, category: string, condition: string, promotion?: Promotion, date?: Date) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    if(typeof image === "string"){
      this.image = this.BASE_URL + image;
    }else{
      this.image=image;
    }

    this.quantity = quantity;
    this.brand = brand;
    this.seller = seller;
    this.category = category;
    if (promotion)
      this.promotion  = promotion
    else
      this.promotion = new Promotion(null, '', 0, '');
    this.condition = condition;
    if (date){
      this.date = date
    }
    this.stock = quantity > 0;
  }
  static newProduct(): Product{
    return new Product(-99,'',0,'','',0,'','','','',Promotion.newPromotion());
  }




}
