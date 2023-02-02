import {ShoppingCart} from "./ShoppingCart";
import {Product} from "./Product";

export class ShoppingCartItem{
  id: number | null;
  quantity: number;
  cart_id: ShoppingCart;
  product: Product;

  constructor(id: number | null, quantity: number, cart_id: ShoppingCart, product: Product) {
    this.quantity = quantity;
    this.cart_id = cart_id;
    this.product = product;
    this.id=id;
  }
}
