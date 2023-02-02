import {PaymentMethod} from "./PaymentMethod";
import {ShoppingCart} from "./ShoppingCart";

export class Payment{
  id: number | null;
  address: string;
  total: number;
  date: Date;
  method: PaymentMethod;
  shopping_cart: ShoppingCart;
  usedCredits: number;
  username: string;

  constructor(id: number | null, address: string, total: number, method: PaymentMethod, shopping_cart: ShoppingCart, usedCredits: number = 0, username: string = "TechOn") {
    this.address = address;
    this.total = total;
    this.method = method;
    this.shopping_cart = shopping_cart;
    this.usedCredits = usedCredits;
    this.username = username;
    this.date = new Date();
    this.id = id;
  }
}
