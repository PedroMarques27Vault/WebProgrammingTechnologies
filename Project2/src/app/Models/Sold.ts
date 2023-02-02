import {Product} from "./Product";
import {Promotion} from "./Promotion";

export class Sold{
  id: number | null;
  product: Product;
  quantity: number;
  buyer: string;
  date: Date;
  promotion: Promotion | null;
  total: number;

  constructor(id: number | null,product: Product, quantity: number = 1, buyer: string, promotion: Promotion | null, total: number = 0) {
    this.product = product;
    this.quantity = quantity;
    this.buyer = buyer;
    this.promotion = promotion;
    this.total = total;
    this.date = new Date();
    this.id=id;
  }
}
