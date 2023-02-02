import {Product} from "./Product";

export class User{
  id: number | null;
  username: string;
  email: string;
  is_superuser: boolean;
  date_joined= new Date();
  first_name: string;
  last_name: string;
  token: string;

  constructor(id: number | null = null, username: string, email: string, is_superuser: boolean, date_joined: Date, first_name: string, last_name: string, token: string='') {
    this.id = id;
    this.username = username;
    this.email= email;
    this.is_superuser = is_superuser ;
    this.date_joined= date_joined;
    this.first_name = first_name;
    this.last_name = last_name;
    this.token=token;

  }
}
