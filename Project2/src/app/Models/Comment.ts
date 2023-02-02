import {Product} from "./Product";

export class Comment{
  id: number | null;
  userName: string;
  userEmail: string;
  description: string;
  rating: number;
  commentDate: Date = new Date();
  product: Product | null;
  stars: number[] = [];

  constructor( userName: string, userEmail: string, description: string, rating: number, product?: Product | null, date?: Date , id?: number | null,) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.description = description;
    this.rating = rating;
    if (date){
      this.commentDate = date;
    }else{
      this.commentDate = new Date();
    }
    if (id){
      this.id = id;
    }else{
      this.id = null;
    }
    if (product){
      this.product = product;
    }else{
      this.product = null;
    }

    for(let i=0; i < Math.floor(rating) ; i++){
      this.stars.push(1);
    }
    if (this.stars.length<this.rating){
      this.stars.push(0);
    }
  }
}
