import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../Models/Product";
import {Observable} from "rxjs";
import {Promotion} from "../Models/Promotion";
import {Comment} from "../Models/Comment";
import {User} from "../Models/User";
import {identifyDynamicQueryNodes} from "@angular/core/schematics/migrations/dynamic-queries/util";
import {Sold} from "../Models/Sold";
import {ShoppingCart} from "../Models/ShoppingCart";
import {Payment} from "../Models/Payment";
import {ShoppingCartItem} from "../Models/ShoppingCartItem";

@Injectable({
  providedIn: 'root'
})

export class DRFService {
  private BASE_URL = 'https://pedromarques27.pythonanywhere.com/';
  public user: User | null;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})}
  constructor(private http: HttpClient) {
    this.user = null;
  }

  login(inUser:string, inPass:string): Observable<User>{
    const url = this.BASE_URL + 'login';
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})}

    let answer = this.http.post<User>(url, {username: inUser, password:inPass}, this.httpOptions)

    return answer
  }
  register(username: string, password: string , email:string): Observable<any> {
    const url = this.BASE_URL + 'signup';
    let f={
      username:username,
      email:email,
      password:password
    }
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})}
    return this.http.post(url,f, this.httpOptions )
  }

  profile(): Observable<User>{
    this.getToken()
    const url = this.BASE_URL + 'profile';
    return this.http.get<User>(url, this.httpOptions);
  }

  credits(): Observable<number>{
    this.getToken()
    const url = this.BASE_URL + 'user/credits';
    return this.http.get<number>(url, this.httpOptions);
  }
  updateUser(us:string, em:string, pass:string, id:number): Observable<any>{
    this.getToken()
    const url = this.BASE_URL + 'userup/'+id;
    let body = {email: em, password: pass, username:us}
    return this.http.put<any>(url, body, this.httpOptions);
  }
  deleteAccount(id:number): Observable<any>{
    this.getToken()
    const url = this.BASE_URL + 'userdel/'+id+"/";
    return this.http.delete<any>(url, this.httpOptions);
  }

  //Products
  getProduct(id:number): Observable<Product>{
    const url = this.BASE_URL + 'product/' + id;
    return this.http.get<Product>(url);
  }

  getProducts(): Observable<Product[]>{
    const url = this.BASE_URL +'products';
    return this.http.get<Product[]>(url);
  }

  createProduct(product: Product): Observable<any>{
    this.getToken();
    const url = this.BASE_URL +'productcre';

    let f  = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      seller:product.seller,
      price: product.price,
      category: product.category,
      condition: product.condition,
      stock: product.stock,
      quantity: product.quantity,
      promotion: product.promotion.id,
      image: product.image
    }

    const formData: FormData = new FormData();

    formData.append("data", JSON.stringify(f))
    return  this.http.post(url, f, this.httpOptions);
  }

  updateProduct(product: Product): Observable<any>{
    this.getToken()
    const url = this.BASE_URL +'productup/'+product.id;


    let f  = {
      id:product.id,
      name: product.name,
      description: product.description,
      brand: product.brand,
      seller:product.seller,
      price: product.price,
      category: product.category,
      condition: product.condition,
      stock: product.stock,
      quantity: product.quantity,
      promotion: product.promotion.id,
      image: product.image,
      date:product.date
    }

    return this.http.put(url, f, this.httpOptions);
  }

  deleteProduct(productId: number): Observable<any>{
    this.getToken()
    const url = this.BASE_URL +'productdel/'+productId;
    return this.http.delete<Product>(url, this.httpOptions);
  }

  search(filters: Map<String, any>): Observable<Product[]>{
    let f  = {
      query: filters.get("query"),
      price: filters.get("price"),
      category: filters.get("categories"),
      seller: filters.get("sellers"),
      brand: filters.get("brands"),
      condition: filters.get("condition"),
      inStock: filters.get("inStock"),
      inPromotion: filters.get("inPromotion"),
    }
    const url = this.BASE_URL +'search';
    return this.http.post<Product[]>(url, f, this.httpOptions);
  }

  //Promotions
  getPromotions(): Observable<Promotion[]>{
    const url = this.BASE_URL +'promotions';
    return this.http.get<Promotion[]>(url);
  }
  createPromotion(promotion: Promotion): Observable<any>{
    const url = this.BASE_URL +'promotioncre';
    let f = {
      discount: promotion.discount,
      name: promotion.name,
      description: promotion.description,
      deadline: promotion.deadline
    }

    return this.http.post(url, f, this.httpOptions);
  }
  updatePromotion(promotion: Promotion): Observable<any>{
    const url = this.BASE_URL +'promotionup/'+promotion.id;
    return this.http.put(url, promotion, this.httpOptions);
  }
  deletePromotion(promotionID: number): Observable<any>{
    const url = this.BASE_URL +'promotiondel/'+promotionID;
    return this.http.delete<Product>(url, this.httpOptions);
  }
  //Users

  getUsers(): Observable<User[]>{
    const url = this.BASE_URL +'users';
    return this.http.get<User[]>(url);
  }

  deleteUser(userID: number): Observable<any>{
    const url = this.BASE_URL +'userdel/'+userID;
    return this.http.delete<User>(url, this.httpOptions);
  }

  //Promotions
  getComments(productId: number): Observable<Comment[]>{
    const url = this.BASE_URL +'product/'+productId+"/comment/";
    return this.http.get<Comment[]>(url);
  }

  //Comments
  getAllComments(): Observable<Comment[]>{
    const url = this.BASE_URL +'comments';
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: Comment): Observable<any>{
    const url = this.BASE_URL +'commentcre';
    let f ={}
    let date = comment.commentDate.getFullYear()+'-'+(comment.commentDate.getMonth()+1)+'-'+comment.commentDate.getDate();
    if (comment.product){
      f = {
        userName: comment.userName,
        userEmail: comment.userEmail,
        description: comment.description,
        rating: comment.rating,
        commentDate: date,
        product: comment.product.id
      }
    }
    else {
      f = {
        userName: comment.userName,
        userEmail: comment.userEmail,
        description: comment.description,
        rating: comment.rating,
        commentDate: date
      }
    }

    return this.http.post(url, f, this.httpOptions);
  }



  deleteComment(commentID: number): Observable<any>{
    const url = this.BASE_URL +'commentdel/'+commentID;
    return this.http.delete<Comment>(url, this.httpOptions);
  }

  addToCart(productId: number, quantityn: number): Observable<any>{
    const url = this.BASE_URL +'addToCart';
    let token = localStorage.getItem('TOKEN')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Token ' + token})}
    let body= {product: String(productId), quantity: String(quantityn)}

    return this.http.post(url, body, this.httpOptions);
  }

  getCart(): Observable<any>{
    let token = localStorage.getItem('TOKEN')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Token ' + token})}

    const url = this.BASE_URL +'cart';
    return this.http.get<string>(url, this.httpOptions);
  }

  getCartTotal(): Observable<any>{
    this.getToken()
    const url = this.BASE_URL +'cart/total';
    return this.http.get<string>(url, this.httpOptions);
  }

  getToken(): void{
    let token = localStorage.getItem('TOKEN')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Token ' + token})}
  }
  checkout(a: string, t:number, u:number, c:number, type:string): Observable<any>{
    this.getToken();
    const url = this.BASE_URL +'pay';
    let body= {address: a, total:t, credits:u, cardNo:c, typeOfCard:type}
    return this.http.post(url, body, this.httpOptions);
  }
  getShoppingCarts(username: string): Observable<Payment[]>{
    this.getToken();
    const url = this.BASE_URL +'shoppingcarts/'+username;
    return this.http.get<Payment[]>(url, this.httpOptions);
  }

  getSoldHistory(username: string): Observable<Sold[]>{
    this.getToken();

    const url = this.BASE_URL +'sold/seller/'+username;
    return this.http.get<Sold[]>(url, this.httpOptions);
  }

  getShoppingCartItems(id: number): Observable<ShoppingCartItem[]>{
    this.getToken();
    const url = this.BASE_URL +'shoppingcarts/'+id+"/items/";
    return this.http.get<ShoppingCartItem[]>(url, this.httpOptions);
  }
}

