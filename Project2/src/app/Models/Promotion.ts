import {Product} from "./Product";

export class Promotion {
  id: number | null;
  name: string;
  discount: number;
  description: string;
  deadline: string;


  constructor(id: number | null, name: string, discount: number, description: string, deadline?:Date) {
    this.name = name;
    this.id=id;
    this.discount = discount;
    this.description = description;
    if(deadline)
      this.deadline=deadline.getFullYear()+'-'+(deadline.getMonth()+1)+'-'+deadline.getDate();
    else{
      var today = new Date();
      this.deadline = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }

  }

  static newPromotion(): Promotion{
    return new Promotion(-99,'',0,'');
  }
}
