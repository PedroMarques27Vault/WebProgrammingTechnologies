export class ShoppingCart{
  id: number | null;
  user_id: string;

  constructor(id: number | null, user_id: string = "0") {
    this.user_id = user_id;
    this.id = id;
  }
}
